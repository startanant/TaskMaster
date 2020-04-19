import React, { useState } from 'react';
import Header from '../Header/Header'
import SideNav from '../SideNav/SideNav';
import MainPage from '../MainPage/MainPage';
import MyTasksPage from '../MyTasksPage/MyTasksPage';
import SettingsPage from '../SettingsPage/SettingsPage';


function TaskMaster(props) {
    return(
        <>
        <div className="taskmaster">
            <div className="sideNav-container">
                <SideNav />
            </div>
            <div className="main">
                <Header />
                <MainPage />
                <MyTasksPage />
                <SettingsPage />
            </div>
        </div>
        </>
    );
}

export default TaskMaster;
