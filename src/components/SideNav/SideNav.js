import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import '../../components-style.css';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../GlobalStore/GlobalStore';
import { PromiseProvider } from 'mongoose';

function SideNav(props) {
    const [globalData, dispatch] = useGlobalStore();
    // const [userLogout, setUserLogout] = useState(false);

    // function logout() {
    //     dispatch({ do: 'loginState', loggedIn: false });
    //     localStorage.removeItem('email');
    // }

    return (
        <>
            {/* {localStorage.getItem('email') ? true : <Redirect to="/login" />} */}
            <div className="sideNav">
                <div className="taskmaster-logo">TaskMaster</div>

                <Link to="/projectdashboard" className="nav-item">
                    <div className="nav-icon">
                        <i class="fas fa-columns"></i>
                    </div>
                    <div className="nav-heading">Dashboards</div>
                </Link>

                <Link to="/mytasks" className="nav-item">
                    <div className="nav-icon">
                        <i className="fas fa-list"></i>
                    </div>
                    <div className="nav-heading">My Tasks</div>
                </Link>

                {/* <Link to="/settings" className="nav-item">
          <div className="nav-icon">
            <i class="fas fa-cog"></i>
          </div>
          <div className="nav-heading">
            Settings
          </div>
      </Link> */}

                <Link onClick={() => props.login(false)} className="nav-item">
                    <div className="nav-icon">
                        <i className="fas fa-door-open"></i>
                    </div>
                    <div className="nav-heading">Logout</div>
                </Link>
            </div>
        </>
    );
}

export default SideNav;
