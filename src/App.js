import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import styled from 'styled-components';
import './components-style.css';
import Header from './components/Header/Header';
import SideNav from './components/SideNav/SideNav';
import MyTasksPage from './components/MyTasksPage/MyTasksPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import Draggable from './components/Draggable/Draggable';
import Droppable from './components/Droppable/Droppable';
import Card from './components/Card/Card';
import Column from './components/Column/Column';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
    const [cards, addCard] = useState(0);
    const Wrapper = styled.div`
        width: 80%;
        padding: 32px;

        justify-content: center;
    `;

    return (

        <Router>
            
            <Header />
            <SideNav />
            <div className="main">
                <Switch>
                <PrivateRoute exact path="/projectdashboard" component={MainPage} />
                <Route exact path="/mytasks" component={MyTasksPage} />
                <Route exact path="/settings" component={SettingsPage} />
                <Route exact path="/login" component={LoginPage} />
                </Switch>
                {/*<Redirect from="*" to="/" /> */}
             </div>  
            
        </Router>

        // <Wrapper>
        //     <Header />
        //     <div className="test">TEST</div>
        //     <SideNav />
        //     <MainPage id="qaz" />
        // </Wrapper>


        
    );
}

export default App;
