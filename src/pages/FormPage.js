import React,{useState,useEffect} from 'react'
import { Card, Row, Col, message } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import FirstForm from '../components/FirstForm'
import SecondForm from '../components/SecondForm'
import ThirdForm from '../components/ThirdForm'
import ReviewForm from '../components/ReviewForm'

import { API_FINAL_SUBMISSION, API_LOGOUT } from '../API'

function FormPage(props) {
    const [step,setStep] = useState(0)
    const [state,setState] = useState({
        phone_number: "",
        name:"",
        age: "",
        cancel_activity: 1,
        occupation: "",
        outlet_code: "",
        outlet_name: "",
        brand: "",
        watched_av: null,
        contact_method:"",
        signature:""
    })

    useEffect(()=>{
        const oc = localStorage.getItem('brd-outlet_code');                
        const on = localStorage.getItem('brd-outlet_name');
        if(oc === null || on === null){
            props.history.push("/profile")
        }
        else{
            setState(state=>({
                ...state,
                "outlet_code":oc,
                "outlet_name":on
            }))
        }
    },[props.history])

    const nextStep = () => {
        setStep(step=> step + 1 )
    }
    const logout = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const token = localStorage.getItem('brd-login');
        config.headers['Authorization'] = `Token ${token}`;

        axios
        .post(API_LOGOUT, null , config)
        .then((res) => {
            message.success("Logout Successfull");
            localStorage.removeItem('brd-login')
            localStorage.removeItem('brd-outlet_name')
            localStorage.removeItem('brd-outlet_code')
            window.location.href = '/';
        })
        .catch((err) => {
            localStorage.removeItem('brd-login')
            localStorage.removeItem('brd-outlet_name')
            localStorage.removeItem('brd-outlet_code')
            message.error(err.response.statusText);
        });
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
        
        const body = JSON.stringify({
            phone_number:  "+88"+state.phone_number,
            name: state.name,
            age:  state.age,
            cancel_activity: null,
            occupation:  state.occupation,
            outlet_code:  state.outlet_code,
            outlet_name:  state.outlet_name,
            brand:  state.brand,
            watched_av:  state.watched_av,
            contact_method: state.contact_method,
        });
        axios
            .post(API_FINAL_SUBMISSION, body, config)
            .then((res) => {
                message.success("Form submitted successfully");
                props.history.push('/profile')
            })
            .catch((err) => {
                message.error(err.response.statusText);
            });
    }
    const cancelActivity = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const token = localStorage.getItem('brd-login');
        config.headers['Authorization'] = `Token ${token}`;

        const body = JSON.stringify({
            phone_number:  "+88"+state.phone_number,
            cancel_activity: state.cancel_activity
        });
        axios
            .post(API_FINAL_SUBMISSION, body, config)
            .then((res) => {
                message.success("Form cancelled  successfully");
                props.history.push('/profile')
            })
            .catch((err) => {
                message.error(err.response.statusText);
            });
    }
    
    const renderForm = () => {
        switch (step) {
            case 0:
                return <FirstForm next={nextStep} logout={logout} onChange={onChange} cancelActivity={cancelActivity} status={state.cancel_activity}/>
            case 1:
                return <SecondForm next={nextStep} logout={logout} onChange={onChange}/>
            case 2:
                return <ThirdForm logout={logout} next={nextStep} onChange={onChange} formSubmit={formSubmit} outletCode={state.outlet_code} outletName={state.outlet_name}/>
            case 3:
                return <ReviewForm onChange={onChange} state={state} formSubmit={formSubmit} outletCode={state.outlet_code} outletName={state.outlet_name}/>
            default:
                return <h1>Thank You</h1>
        }
    }
    return (
        <div className="container my-5" style={{width:'80vw'}}>
            <Card>
                <Row justify="center">
                    <Col sm={20} md={16} lg={12}>
                        {renderForm()}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default withRouter(FormPage)
