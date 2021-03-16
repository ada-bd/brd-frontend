import React,{useState} from 'react'
import { Form,Input,Select,Checkbox,Row,Button } from 'antd'

const { Option } = Select;
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

export default function SecondForm(props) {
    const [disableNext,setDisableNext] = useState(true)
    const [form] = Form.useForm()
    const [cardHidden,setCardHidden] = useState(true)
    setTimeout(() => {
        setCardHidden(false)
    }, 700);   

    const cardAnimation = cardHidden? {opacity:0,transform:"translate3d(0, -60px, 0)"} : null

    return (
        <Form style={cardAnimation} form={form} className="my-5" onFinish={props.next}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input style={{minWidth:"100%"}} onChange={(e)=>props.onChange("name",e.target.value)}/>
            </Form.Item>
            <Form.Item name="age" label="Select age" rules={[{ required: true }]}> 
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("age",e)}
                    >
                    <Option value="1">18-25</Option>
                    <Option value="2">26-30</Option>
                    <Option value="3">31-35</Option>
                    <Option value="4">36-40</Option>
                    <Option value="5">41-45</Option>
                    <Option value="6">46-50</Option>
                    <Option value="7">50+</Option>
                </Select>
            </Form.Item>
            <Form.Item name="occupation" label="Occupation" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("occupation",e)}
                >
                    <Option value="1">Service Holder ( চাকুরীজীবী )</Option>
                    <Option value="2">Student ( ছাত্র )</Option>
                    <Option value="3">Small Medium Enterprise Businessman ( ক্ষুদ্র ও মাঝারী ব্যবসায়ী )</Option>
                    <Option value="4">Factory Worker ( কারখানা কর্মী )</Option>
                    <Option value="5">Shop Assistant ( দোকান সহকারি )</Option>
                    <Option value="6">Driver/ Helper ( ড্রাইভার / হেল্পার )</Option>
                    <Option value="7">Rickshaw / Van Puller ( রিকশাচালক / ভ্যান চালক )</Option>
                    <Option value="8">Mechanic ( মেকানিক )</Option>
                    <Option value="9">Garments Factory Worker ( গার্মেন্টস ফ্যাক্টরি ওয়ার্কার )</Option>
                    <Option value="10">Farmer ( কৃষক )</Option>
                    <Option value="11">Security Guard ( সিকিউরিটি গার্ড )</Option>
                    <Option value="12">Unemployed/Dependent ( বেকার )</Option>
                    <Option value="13">Other ( অন্যান্য )</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Disclaimer">
                I am Above 18 and agreed to
                provide the information
                voluntarily which may be
                used for research purposes.
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                {...tailFormItemLayout}
            >
                <Checkbox onChange={()=>setDisableNext(!disableNext)}>
                    I agree
                </Checkbox>
            </Form.Item>

            <Row justify="center">
                <Button size="large" shape="round" type="default" style={{marginRight:"20px"}} onClick={props.logout}>Logout</Button>
                <Button size="large" shape="round" type="primary" htmlType='submit' disabled={disableNext}>Next</Button>
            </Row>
        </Form>
    )
}
