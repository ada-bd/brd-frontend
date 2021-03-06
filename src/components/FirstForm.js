import React,{useState} from 'react'
import { Input,Form,Button, Row, Progress,message,Modal,Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios';
import { Link } from 'react-router-dom'

import { API_SEND_OTP,API_OTP_CONFIRMATION } from '../API'

let tick = null;
export default function FirstForm(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [varified,setVarified] = useState(false)
    const [timer,setTimer] = useState(60)
    const [cardHidden,setCardHidden] = useState(true)
    setTimeout(() => {
        setCardHidden(false)
    }, 700);

    const cardAnimation = cardHidden? {opacity:0,transform:"translate3d(0, -60px, 0)"} : null

    const startTimer = () => {
        tick = setInterval(()=>{
            setTimer( timer => timer-1)
        },1000)
    }
    
    const clearTimer = () => {
        clearInterval(tick)
        setTimer(60)
        startTimer()
        sendOTP()
    }

    const checkOTPVarification = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify({
            phone_number: "+88"+form.getFieldValue('phone_number'),
            vendor: "2",
            otp: form.getFieldValue('otp')
        });
        axios
            .post(API_OTP_CONFIRMATION, body, config)
            .then((res) => {
                    setVarified(true)
                    message.success("Phone number varified successfully");
                })
                .catch((err) => {
                    setVarified(false)
                    message.error("Wrong OTP");
                });
    }

    const sendOTP = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify({
            phone_number: "+88"+form.getFieldValue('phone_number'),
            vendor: "2"
        });
        axios
            .post(API_SEND_OTP, body, config)
            .then((res) => {
                message.success("OTP Send successfully");
            })
            .catch((err) => {
                message.error(err.response.data[0]);
            });
    }

    const handleOk = () => {
        setIsModalVisible(false);
        props.cancelActivity()
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    return (
        <Form style={cardAnimation} form={form} className="my-5" onFinish={props.next}>

            <Modal title="Select reason to cancel" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Radio.Group onChange={(e)=> props.onChange('cancel_activity',e.target.value)} value={props.status}>
                    <Radio style={radioStyle} value={1}>OTP Not receive</Radio>
                    <Radio style={radioStyle} value={2}>Consumer not willing to continue</Radio>
                </Radio.Group>
            </Modal>
            <Row justify="end">
                <Link to="/profile"><UserOutlined size="middle" type="primary" style={{fontSize:30}}/></Link>
                <Link to="/cs"><Button size="middle" type="primary" style={{marginLeft:"20px"}}>CS</Button></Link>
            </Row>
            <br/>
            <Form.Item name="phone_number" label="Phone number" rules={[
                {
                    pattern: /^[\d]{11,11}$/,
                    message: "Phone number must be 11 digit",
                },
                {
                    required: true
                }
            ]}>
                <Input type="number" placeholder="Ex. 01XXXXXXXXX" style={{minWidth:"100%"}} onChange={(e)=>props.onChange("phone_number",e.target.value)}/>
            </Form.Item>
            <Row justify="center">
                <Button size="large" shape="round" type="primary" onClick={clearTimer} style={{marginRight:"20px"}}>Send</Button>
                <Button size="large" shape="round" type="primary" onClick={clearTimer} disabled={timer>0}>Re-send</Button>
            </Row>
            <br/>
            <Form.Item label="Input OTP" name="otp">
                <Input type="number" placeholder="Expecting 4 digits OTP" style={{minWidth:"100%"}}/>
            </Form.Item>

            <Row justify="center" style={{alignItems:'center'}}>
                <Progress
                    type="circle" 
                    percent={timer}
                    width={80}
                    format={percent => `${percent}`}
                    strokeColor={{'0%': 'red','100%': 'green'}} 
                />
                <Button size="large" shape="round" type="primary" style={{marginLeft:"30px"}} onClick={checkOTPVarification}>Verify</Button>
            </Row>
            <br/>
            <Row justify="center">
                <Button size="large" shape="round" type="primary" style={{marginLeft:"30px"}} onClick={()=>setIsModalVisible(true)}>Cancel Activity</Button>
            </Row>
            <br/>
            <Row justify="center">
                <Button size="large" shape="round" type="default" style={{marginRight:"20px"}} onClick={props.logout}>Logout</Button>
                <Button size="large" shape="round" type="primary" htmlType="submit" disabled={!varified}>Next</Button>
            </Row>
        </Form>
    )
}
