import React from 'react';
import { Form, Input, Button, message, Card, Row, Col } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { API_LOGIN } from '../API';

export default function LoginPage({ isAuthenticated }) {
    const onFinish = (values) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify({
            username: values['username'],
            password: values['password'],
        });
        
        axios
        .post(API_LOGIN, body, config)
        .then((res) => {
            localStorage.setItem('brd-login', res.data.token);
            window.location.href = "/form"
        })
        .catch((err) => {
            message.error(err.response.data.error);
        });
    };
    
    return isAuthenticated ? (
        <Redirect
        to={{
            pathname: '/form',
        }}
        />
        ) : (
            <div className="container my-5" style={{width:'80vw'}}>
            <Card>
                <Row justify="center" className="py-5">
                    <Col xs={20} md={14}>
                        <Form onFinish={onFinish}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                                >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button shape="round" size="large" type="primary" htmlType="submit" style={{marginLeft:"40%"}}>Login</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

