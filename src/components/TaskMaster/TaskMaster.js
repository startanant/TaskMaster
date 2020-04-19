import React, { useState } from 'react';
import Header from '../Header/Header'
import SideNav from '../SideNav/SideNav';
import MainPage from '../MainPage/MainPage';
import MyTasksPage from '../MyTasksPage/MyTasksPage';
import SettingsPage from '../SettingsPage/SettingsPage';


function TaskMaster(props) {
    //console.log(props.title);
    const title = props.title;
    return(
        <>
        <div className="taskmaster">
            <div className="sideNav-container">
                <SideNav />
            </div>
            <div className="main">
                <Header />
                {title === 'dashboard' ? <MainPage /> : ''}
                {title === 'mytasks' ? <MyTasksPage /> : ''}
                {title === 'settings' ? <SettingsPage /> : ''}
                
            </div>
        </div>
        </>
    );
}

export default TaskMaster;
