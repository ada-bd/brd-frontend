import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { API_BRD_PROFILE } from "../API"
import { Card, Row, Col, Timeline, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography;

export default function CSPage() {
    const [ name,setName ] = useState()
    const [ phone,setPhone ] = useState()
    const [ address,setAddress ] = useState()
    const [ today_date,setToday_date ] = useState()
    const [ achieved,setAchieved ] = useState(0)
    
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
            setName(res.data.name)
            setPhone(res.data.phone_number)
            setAddress(res.data.address)
            setToday_date(res.data.today_date)
            setAchieved(res.data.today_achieved)            
        })
        .catch((err) => {
            console.log(err.response);
        });

    }, [])

    return (
        <div className="container my-5" style={{width:'70vw'}}>
            <Card>
                <Row justify="center">
                    <Col xs={20} md={16}>
                        <Timeline mode="right">
                            <Timeline.Item label={today_date}><Title level={5}>{name}</Title></Timeline.Item>
                            {phone? <Timeline.Item><Title level={5}>{phone}</Title></Timeline.Item>:null}
                            {address? <Timeline.Item><Title level={5}>{address}</Title></Timeline.Item>:null}
                            <Timeline.Item color="green">Till now you have achieved <Text strong={true}>{achieved}</Text> surveys today</Timeline.Item>
                        </Timeline>
                        <Row justify="center">
                            <Link to="/form">
                                <Button size="large" shape="round" type="default">Back to Homepage</Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
