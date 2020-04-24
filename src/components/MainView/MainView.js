import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import MainPage from '../MainPage/MainPage';
import Header from '../Header/Header';
import MyTasksPage from '../MyTasksPage/MyTasksPage';
import { useGlobalStore } from '../GlobalStore/GlobalStore';
import LoginPage from '../LoginPage/LoginPage';
function MainView(props) {
    return (
        <Router>
            <Route exact path="/">
                <div className="taskmaster">
                    <div className="sideNav-container">
                        <SideNav login={props.login} />
                    </div>
                    <div className="main">
                        <MainPage />
                    </div>
                </div>
            </Route>
            <Route exact path="/mytasks">
                <div className="taskmaster">
                    <div className="sideNav-container">
                        <SideNav login={props.login} />
                    </div>
                    <div className="main">
                        <MyTasksPage />
                    </div>
                </div>
            </Route>
            <Route exact path="/projectdashboard">
                <div className="taskmaster">
                    <div className="sideNav-container">
                        <SideNav login={props.login} />
                    </div>
                    <div className="main">
                        <MainPage />
                    </div>
                </div>
            </Route>
            <Route exact path="/login">
                <LoginPage />
            </Route>
        </Router>
    );
}

export default MainView;
