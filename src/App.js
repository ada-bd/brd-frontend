import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import FormPage from './pages/FormPage'
import ProfilePage from './pages/ProfilePage'
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default function App() {
    const isAuthenticated = localStorage.getItem('brd-login') != null;
    return (
        <Layout>
            <Content style={{minHeight: '70vh'}}>
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
                        <ProtectedRoute
                            exact path="/profile"
                            isAuthenticated={isAuthenticated}
                            component={ProfilePage}
                        />
                    </Switch>
                </Router>
            </Content>
            <Footer style={{ textAlign: 'center',minHeight: '30vh' }}>Copyright ©2021 BRD</Footer>
        </Layout>
    )
}
