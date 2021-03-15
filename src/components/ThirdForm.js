import React,{ useState } from 'react'
// import React,{ useState,useRef } from 'react'
import { Form, Input,Row,Button,Select,Modal } from 'antd'
// import SignatureCanvas from 'react-signature-canvas'

const { Option } = Select;

export default function ThirdForm(props) {
    // const sigPad = useRef({})
    const [cardHidden,setCardHidden] = useState(true)
    const [form] = Form.useForm()

    setTimeout(() => {
        setCardHidden(false)
    }, 700);

    // const onFinish = ({outlet_code,outlet_name,brand,watched_av,contact_method}) => {
    //     const canvas = sigPad.current.getTrimmedCanvas().toDataURL("image/png")
    //     props.thirdFormFinish(outlet_code,outlet_name,brand,watched_av,contact_method,canvas)
    //     props.finalSubmit()
    // }
    function showModal() {
        Modal.info({content: 'Please shift to AR app followed by Brand message'});
    }
    const cardAnimation = cardHidden? {opacity:0,transform:"translate3d(0, -60px, 0)"} : null

    return (
        <Form style={cardAnimation} form={form} onFinish={props.formSubmit}>
            <Form.Item name="outlet_code" label="Outlet code" rules={[
                {
                    pattern: /^[\d]{10,11}$/,
                    message: "Outlet code must be between 10 digits and 11 digits.",
                },
                {
                    required: true
                }
            ]}>
                <Input type="number" placeholder="Min 10 Max 11" style={{minWidth:"100%"}} onChange={(e)=>props.onChange("outlet_code",e.target.value)}/>
            </Form.Item>
            <Form.Item name="outlet_name" label="Outlet name" rules={[{ required: true }]}>
                <Input style={{minWidth:"100%"}} onChange={(e)=>props.onChange("outlet_name",e.target.value)}/>
            </Form.Item>
            <Form.Item name="brand" label="Current Brand" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>{
                        showModal()
                        props.onChange("brand",e)
                    }}
                    >
                    <Option value="1">Navy</Option>
                    <Option value="2">Star</Option>
                    <Option value="3">Derby</Option>
                    <Option value="4">Hollywood</Option>
                    <Option value="5">Royals</Option>
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
            <Form.Item name="contact_method" label="Contact method" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("contact_method",e)}
                >
                    <Option value="1">Lighter VAO</Option>
                    <Option value="2">Plastic Sachet</Option>
                    <Option value="3">1 Stick trial</Option>
                    <Option value="4">Brand Message</Option>
                </Select>
            </Form.Item>
            {/* <Form.Item label="Signature">
                <div style={{border:'1px solid black'}}>
                    <SignatureCanvas 
                        ref={sigPad}
                        penColor='black'
                        canvasProps={{width: 300, height: 100, className: 'sigCanvas'}} />
                </div>
            </Form.Item> */}
            <Row justify="center">
                <Button size="large" shape="round" type="primary" onClick={props.next}>Review form</Button>
            </Row>
            <br/>
            <Row justify="center">
                <Button size="large" shape="round" type="default" style={{marginRight:"20px"}} onClick={props.logout}>Logout</Button>
                <Button size="large" shape="round" type="primary" htmlType="submit">Submit</Button>
            </Row>
        </Form>
    )
}
