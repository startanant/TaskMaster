import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import './components-style.css';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MainView from './components/MainView/MainView';
// import Message from './components/Message/Message';
import {
    GlobalStore,
    useGlobalStore,
} from './components/GlobalStore/GlobalStore';
// import {} from './components/GlobalStore/GlobalStore';

function App() {
    // const [globalData, dispatch] = useGlobalStore();
    const isLoggedIn = localStorage.getItem('email') ? true : false;
    const [isLogged, setLogged] = useState(isLoggedIn);

    // ? setLogged(true)
    // : setLogged(false);

    async function userLogin(userData) {
        if (!userData) {
            localStorage.removeItem('email');
            setLogged(false);
        } else {
            const url = '/api/login';
            const result = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json());
            if (result.email) {
                localStorage.setItem('email', result.email);
                setLogged(true);
            } else {
                // dispatch();
            }
        }
    }
    return (
        <Router>
            <GlobalStore>
                <Switch>
                    <Route exact path="/">
                        {isLoggedIn ? (
                            <MainView login={userLogin} />
                        ) : (
                            <LoginPage login={userLogin} />
                        )}
                    </Route>
                    <Route exact path="/login">
                        {isLoggedIn ? (
                            <MainView login={userLogin} />
                        ) : (
                            <LoginPage login={userLogin} />
                        )}
                    </Route>
                    <Route exact path="/register">
                        {isLoggedIn ? (
                            <MainView login={userLogin} />
                        ) : (
                            <RegisterPage />
                        )}
                    </Route>
                    <Route exact path="/projectdashboard">
                        {isLoggedIn ? (
                            <MainView login={userLogin} />
                        ) : (
                            <LoginPage login={userLogin} />
                        )}
                    </Route>
                    <Route exact path="/mytasks">
                        {isLoggedIn ? (
                            <MainView login={userLogin} />
                        ) : (
                            <LoginPage login={userLogin} />
                        )}
                    </Route>
                </Switch>
                {/* <Message /> */}
            </GlobalStore>
        </Router>
    );
}

export default App;
