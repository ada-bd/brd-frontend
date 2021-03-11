import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import FormPage from './pages/FormPage'
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default function App() {
    const isAuthenticated = localStorage.getItem('brd-login') != null;
    return (
        <Layout>
            <Content style={{minHeight: '90vh'}}>
                <Router>
                    <Switch>
                        <Route  
                            exact path="/"
                            render={() => (
                                <LoginPage
                                    isAuthenticated={isAuthenticated}
                                />
                            )}
                        />
                        <ProtectedRoute
                            exact path="/form"
                            isAuthenticated={isAuthenticated}
                            component={FormPage}
                        />
                    </Switch>
                </Router>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}
