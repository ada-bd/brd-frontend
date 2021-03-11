import React from 'react';
import { Form, Input, Button, message } from 'antd';
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
                window.location.href = '/form';
            })
            .catch((err) => {
                message.error(err.response.data.error);
            });
        };
        
    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo);
    };
    return isAuthenticated ? (
        <Redirect
            to={{
                pathname: '/form',
            }}
        />
    ) : (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: '30%', margin: 'auto', marginTop: '10%' }}
        >
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
                <Button
                    style={{ background: '#8f5db7', color: 'white',width:'40%',marginLeft:'30%' }}
                    htmlType="submit"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
