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

    const onFinish = ({name,age,occupation}) => {
        props.secondFormFinish(name,age,occupation)
        props.next()
    };    

    const cardAnimation = cardHidden? {opacity:0,transform:"translate3d(0, -60px, 0)"} : null

    return (
        <Form style={cardAnimation} form={form} onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input style={{minWidth:"100%"}}/>
            </Form.Item>
            <Form.Item name="age" label="Select age" rules={[{ required: true }]}> 
                <Select
                    placeholder="Select"
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
                >
                    <Option value="1">Service Holder ( চাকরিজীবী )</Option>
                    <Option value="2">Student ( স্টূডেন্ট )</Option>
                    <Option value="3">Small Medium Enterprise Businessman ( ক্ষুদ্রওমাঝািীবযাবসায়ী )</Option>
                    <Option value="4">Factory Worker ( কািখানাকমী )</Option>
                    <Option value="5">Shop Assistant ( দ াকানসহকারি )</Option>
                    <Option value="6">Driver/ Helper ( ড্রাইভাি / দহলপাি )</Option>
                    <Option value="7">Rickshaw / Van Puller ( রিকশাচালক/ ভযানচালক )</Option>
                    <Option value="8">Mechanic ( দমকারনক )</Option>
                    <Option value="9">Garments Factory Worker ( গাডমেন্টস ফ্যাক্টিীওয়াকোি )</Option>
                    <Option value="10">Farmer ( কৃষক )</Option>
                    <Option value="11">Security Guard ( রসরকউরিটিগােে )</Option>
                    <Option value="12">Unemployed/Dependent</Option>
                    <Option value="13">Other</Option>
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
                <Button size="large" shape="round" type="primary" htmlType="submit" disabled={disableNext}>Next</Button>
            </Row>
        </Form>
    )
}
