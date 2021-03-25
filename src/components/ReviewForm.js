import React,{useState} from 'react'
import { Form, Select, Input, Button, Row, Typography } from 'antd'

const { Option } = Select
const { Text } = Typography;

export default function ReviewForm(props) {
    const [sending,setSending] = useState(false)
    const [form] = Form.useForm();
    return (
        <Form form={form} onFinish={()=>{
            setSending(true)
            props.formSubmit()
        }} initialValues={props.state}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input onChange={(e)=>props.onChange("name",e.target.value)}/>
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
            <Form.Item label="Outlet code">
                <Text type="secondary">{props.outletCode}</Text>
            </Form.Item>
            <Form.Item label="Outlet name">
                <Text type="secondary">{props.outletName}</Text>
            </Form.Item>
            <Form.Item name="brand" label="Current Brand" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("brand",e)}
                    >
                    <Option value="1">Derby (ডার্বি)</Option>
                    <Option value="2">Hollywood (হলিউড)</Option>
                    <Option value="3">Royals (রয়ালস)</Option>
                    <Option value="4">(অন্যান্য)</Option>
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
                    <Option value="1">1 Stick (১ শলাকা)</Option>
                    <Option value="2">2-3 Sticks (২ হতে ৩ শলাকা)</Option>
                    <Option value="3">4-5 Sticks (৪ হতে ৫ শলাকা)</Option>
                    <Option value="4">More than 5 Sticks (৫ শলাকার বেশি)</Option>
                </Select>
            </Form.Item>
            <br/>
            <Row justify="center">
                <Button size="large" shape="round" type="primary" htmlType="submit" disabled={sending}>Submit</Button>
            </Row>
        </Form>
    )
}
