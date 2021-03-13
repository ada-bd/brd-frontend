import React from 'react'
import { Form, Select, Input, Button, Row } from 'antd'

const { Option } = Select

export default function ReviewForm(props) {
    const [form] = Form.useForm();
    return (
        <Form form={form} onFinish={props.formSubmit} initialValues={props.state}>
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
            <Form.Item name="outlet_code" label="Outlet code" rules={[{ required: true }]}>
                <Input type="number" placeholder="Min 10 Max 11" style={{minWidth:"100%"}} onChange={(e)=>props.onChange("outlet_code",e.target.value)}/>
            </Form.Item>
            <Form.Item name="outlet_name" label="Outlet name" rules={[{ required: true }]}>
                <Input style={{minWidth:"100%"}} onChange={(e)=>props.onChange("outlet_name",e.target.value)}/>
            </Form.Item>
            <Form.Item name="brand" label="Current Brand" rules={[{ required: true }]}>
                <Select
                    placeholder="Select"
                    onChange={(e)=>props.onChange("brand",e)}
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
            <br/>
            <Row justify="center">
                <Button size="large" shape="round" type="primary" htmlType="submit">Submit</Button>
            </Row>
        </Form>
    )
}
