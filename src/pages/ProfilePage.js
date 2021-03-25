import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { API_BRD_PROFILE } from "../API"

import { Card, Row, Col, Form, Input, Button, Spin, Space  } from 'antd'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function ProfilePage() {
    const [state,setState] = useState()
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const token = localStorage.getItem('brd-login');
        config.headers['Authorization'] = `Token ${token}`;

        axios
            .get(API_BRD_PROFILE, config)
            .then((res) => {
                setState({
                    "region": res.data.region,
                    "area": res.data.area,
                    "territory": res.data.territory,
                    "tab_imei": res.data.tab_imei,
                    "sim_no": res.data.sim_no,
                    "address": res.data.address,
                    "outlet_code": res.data.outlet_code,
                    "outlet_name": res.data.outlet_name,
                })                  
            })
            .catch((err) => {
                console.log(err.response);
            });
            
        }, [])
    const onFinish = (values) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const token = localStorage.getItem('brd-login');
        config.headers['Authorization'] = `Token ${token}`;
        
        const body = JSON.stringify(values)
        
        axios
            .put(API_BRD_PROFILE, body, config)
            .then((res) => {
                window.location.href = "/form"
                localStorage.setItem('brd-outlet_code', res.data.outlet_code);                
                localStorage.setItem('brd-outlet_name', res.data.outlet_name);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="container my-5" style={{width:'60vw'}}>
            <Card>
                <Row justify="center">
                    <Col xs={20} md={16}>
                    {state?
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        initialValues={state}
                    >
                        <Form.Item
                            label="Region"
                            name="region"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Area"
                            name="area"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Territory"
                            name="territory"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tab IMEI"
                            name="tab_imei"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Sim No"
                            name="sim_no"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="outlet_code" label="Outlet code" rules={[
                            {
                                pattern: /^[\d]{10,11}$/,
                                message: "Outlet code must be between 10 digits and 11 digits.",
                            },
                            {
                                required: true
                            }
                        ]}>
                            <Input type="number" placeholder="Min 10 Max 11" style={{minWidth:"100%"}} />
                        </Form.Item>
                        <Form.Item
                            label="Outlet Name"
                            name="outlet_name"
                            rules={[{ required: true}]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>:
                        <Space size="large">
                            <Spin size="large" />
                        </Space>
                        }
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
