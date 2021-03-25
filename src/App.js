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
import CSPage from './pages/CSPage'
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default function App() {
    const isAuthenticated = localStorage.getItem('brd-login') != null;
    // localStorage.removeItem('brd-outlet_name')
    // localStorage.removeItem('brd-outlet_code')
    const outlet_code = localStorage.getItem('brd-outlet_code')
    const outlet_name = localStorage.getItem('brd-outlet_name')
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
                            outletCode={outlet_code}
                            outletName={outlet_name}
                        />
                        <ProtectedRoute
                            exact path="/profile"
                            isAuthenticated={isAuthenticated}
                            component={ProfilePage}
                        />
                        <ProtectedRoute
                            exact path="/cs"
                            isAuthenticated={isAuthenticated}
                            component={CSPage}
                        />
                    </Switch>
                </Router>
            </Content>
            <Footer style={{ textAlign: 'center',minHeight: '30vh' }}>Copyright ©2021 BRD</Footer>
        </Layout>
    )
}
