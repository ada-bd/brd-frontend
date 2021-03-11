import React,{useState} from 'react'
import { Card, Row, Col, message } from 'antd'
import axios from 'axios'

import FirstForm from '../components/FirstForm'
import SecondForm from '../components/SecondForm'
import ThirdForm from '../components/ThirdForm'

import { API_FINAL_SUBMISSION } from '../API'

export default function FormPage() {
    const [step,setStep] = useState(0)
    const [state,setState] = useState({
        phone_number: "",
        name:"",
        age: "",
        occupation: "",
        outlet_code: "",
        outlet_name: "",
        brand: "",
        watched_av: null,
        contact_method:"",
        signature:""
    })

    const nextStep = () => {
        setStep(step=> step + 1 )
    }
    const logout = () => {
        localStorage.removeItem('brd-login')
        window.location.href = '/';
    }

    const onChange = (name,value) => {
        setState({...state,[name]:value})
    }

    const formSubmit = ()=> {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const token = localStorage.getItem('brd-login');
        config.headers['Authorization'] = `Token ${token}`;
        
        let image = new Image()
        image.src = state.signature
        
        const body = JSON.stringify({
            phone_number:  "+88"+state.phone_number,
            name: state.name,
            age:  state.age,
            occupation:  state.occupation,
            outlet_code:  state.outlet_code,
            outlet_name:  state.outlet_name,
            brand:  state.brand,
            watched_av:  state.watched_av,
            contact_method: state.contact_method,
            // signature: image
        });
        axios
            .post(API_FINAL_SUBMISSION, body, config)
            .then((res) => {
                message.success("Form submitted successfully");
            })
            .catch((err) => {
                message.error(err.response.statusText);
                console.log(err.response);
            });
        console.log(body)
    }
    const renderForm = () => {
        switch (step) {
            case 0:
                return <FirstForm next={nextStep} logout={logout} onChange={onChange}/>
            case 1:
                return <SecondForm next={nextStep} logout={logout} onChange={onChange}/>
            case 2:
                return <ThirdForm logout={logout} onChange={onChange} formSubmit={formSubmit}/>
            default:
                return <h1>Thank You</h1>
        }
    }
    return (
        <div className="container">
            <Card className="mt-3">
                <Row>
                    <Col span={10} offset={7}>
                        {renderForm()}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
