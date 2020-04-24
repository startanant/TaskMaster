import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useGlobalStore } from '../GlobalStore/GlobalStore';
import { login } from '../../utils';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';

function LoginPage(props) {
    // const isLoggedIn = localStorage.getItem('email') ? true : false;
    const [globalData, dispatch] = useGlobalStore();
    const [userData, setUserData] = useState({ email: '', password: '' });

    const inputEmail = useRef();
    const inputPassword = useRef();
    // if (localStorage.getItem('email')) {
    //     dispatch({ do: 'loginState', loggedIn: true });
    // }

    function handleInputChange(e) {
        const { id, value } = e.target; //

        setUserData({ ...userData, [id]: value });
    }
    return (
        <div className="loginPage">
            {/* {globalData.loggedIn ? <Redirect to="/" /> : ''} */}

            <div className="card login-card">
                <div className="card-header title-header">
                    <h1>TaskMaster</h1>
                    <h4 style={{ color: 'grey' }}>
                        Keep your projects organized.
                    </h4>
                </div>
                <div className="card-header">Login</div>
                <Message />
                <div className="card-body">
                    <input type="hidden" id="db_id" value="" />
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input
                            value={userData.email}
                            onChange={handleInputChange}
                            ref={inputEmail}
                            id="email"
                            type="email"
                            className="form-control login-input"
                        />
                    </div>
                    <div className="form-group">
                        <label for="userPassword">Password</label>
                        <input
                            value={userData.password}
                            onChange={handleInputChange}
                            ref={inputPassword}
                            id="password"
                            type="password"
                            className="form-control login-input "
                        />
                    </div>
                    <button
                        onClick={() => props.login(userData)}
                        type="button"
                        className="btn btn-outline-light submit"
                    >
                        Login
                    </button>
                    <footer className="footer-card">
                        Don't have an account?
                        <Link to="/register" className="loginBtn">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-light"
                            >
                                Register
                            </button>
                        </Link>
                    </footer>
                </div>
            </div>

            {/* <button onClick={() => handleLogin()}>Click here to log in</button> */}
        </div>
    );
}

export default LoginPage;
