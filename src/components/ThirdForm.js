import React,{ useState,useRef } from 'react'
import { Form,Row,Button,Select ,Typography, Modal } from 'antd'
import SignatureCanvas from 'react-signature-canvas'

const { Option } = Select;
const { Text } = Typography;

export default function ThirdForm(props) {
    const sigPad = useRef({})
    const [sending,setSending] = useState(false)
    const [cardHidden,setCardHidden] = useState(true)
    const [form] = Form.useForm()

    setTimeout(() => {
        setCardHidden(false)
    }, 700);

    function showModal() {
        Modal.info({content: 'Please shifts to AR app followed by Brand message then back to microsite again'});
    }

    const cardAnimation = cardHidden? {opacity:0,transform:"translate3d(0, -60px, 0)"} : null
    
    return (
        <Form style={cardAnimation} form={form} onFinish={()=>{
            setSending(true)
            props.formSubmit()
        }}>
            <Form.Item label="Outlet code">
                <Text type="secondary">{props.outletCode}</Text>
            </Form.Item>
            <Form.Item label="Outlet name">
                <Text type="secondary">{props.outletName}</Text>
            </Form.Item>
            <Form.Item name="brand" label="Current Smoking Brand" rules={[{ required: true }]}>
                <Select
                    placeholder="Which brand do you smoke on a regular basis? "
                    onChange={(e)=>{
                        showModal()
                        props.onChange("brand",e)
                    }}
                    >
                    <Option value="1">Navy (নেভি)</Option>
                    <Option value="2">Star (ষ্টার)</Option>
                    <Option value="3">Derby (ডার্বি)</Option>
                    <Option value="4">Hollywood (হলিউড)</Option>
                    <Option value="4">Royals (রয়ালস)</Option>
                    <Option value="4">Others (অন্যান্য)</Option>
                </Select>
            </Form.Item>
            <Form.Item name="watched_av" label="Have existing adult smoker watched AV?" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("watched_av",e)}
                    >
                    <Option value="1">Yes</Option>
                    <Option value="2">No</Option>
                    <Option value="3">Partial</Option>
                </Select>
            </Form.Item>
            <Form.Item name="contact_method" label="How did the trial end?" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("contact_method",e)}
                >
                    <Option value="1">Lighter VAO(KS+Century)</Option>
                    <Option value="2">Lighter VAO(KS+KS)</Option>
                    <Option value="3">Plastic Sachet With Century</Option>
                    <Option value="4">Plastic Sachet With Special Filter</Option>
                    <Option value="5">1 Stick Trial of Century</Option>
                    <Option value="6">1 Stick Trial of Special Filter</Option>
                    <Option value="7">Brand message</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Signature">
                <div style={{border:'1px solid black'}}>
                    <SignatureCanvas 
                        ref={sigPad}
                        penColor='black'
                        canvasProps={{width: 300, height: 100, className: 'sigCanvas'}} />
                </div>
            </Form.Item>
            <Row justify="center">
                <Button size="large" shape="round" type="primary" onClick={props.next}>Review form</Button>
            </Row>
            <br/>
            <Row justify="center">
                <Button size="large" shape="round" type="default" style={{marginRight:"20px"}} onClick={props.logout}>Logout</Button>
                <Button size="large" shape="round" type="primary" htmlType="submit" disabled={sending}>Submit</Button>
            </Row>
        </Form>
    )
}
