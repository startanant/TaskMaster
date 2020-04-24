import React, { useState, useRef } from 'react';
import { useGlobalStore } from '../GlobalStore/GlobalStore';
import { Redirect } from 'react-router-dom';
import { login } from '../../utils';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';

// const LoginPage = (props) => {

//     const handleLogin = () => {
//         login();
//         props.history.push('/projectdashboard');
//     }

//     return (
//         <div>
//             <h1>Sign in</h1>

//             <button onClick={() => handleLogin()}>Click here to log in</button>
//         </div>
//     );
// };

function RegisterPage(props) {
    const [userData, setUserData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });
    const [globalData, dispatch] = useGlobalStore();
    const [isRegistered, setIsRegistered] = useState(false);
    const inputEmail = useRef();
    const inputPassword = useRef();

    function handleInputChange(e) {
        const { id, value } = e.target; //

        setUserData({ ...userData, [id]: value });
    }

    async function register() {
        let testUser = {
            email: 'justin@trudeau.com',
            name: 'justin',
            firstname: 'Justin',
            lastname: 'Trudeau',
            password: 'myOwnSecret@1',
        };
        const url = '/api/addUser';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(testUser),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        console.log(result);
    }

    async function registerUser(e) {
        e.preventDefault();

        if (
            userData.email.trim() === '' ||
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                userData.email
            )
        ) {
            inputEmail.current.focus();
            dispatch({
                do: 'setMessage',
                type: 'danger',
                message: 'Please provide a valid email',
            });
            return;
        }

        if (userData.password.trim() === '') {
            inputPassword.current.focus();
            dispatch({
                do: 'setMessage',
                type: 'danger',
                message: 'Please provide a password',
            });
            return;
        }

        if (userData.password.trim().length < 3) {
            inputPassword.current.focus();
            dispatch({
                do: 'setMessage',
                type: 'danger',
                message: 'Please provide a longer password (3 characters min)!',
            });
            return;
        }

        // const apiResult = await API.post('/api/user/register', userData);
        console.log(userData);
        const url = '/api/addUser';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        console.log(result);

        if (result._id) {
            dispatch({
                do: 'setMessage',
                type: 'success',
                message: 'Thank you! Successfully registered!',
            });
            // // let the message sit for a bit then redirect to login
            setTimeout(function () {
                setIsRegistered(true);
            }, 1000);
        } else {
            dispatch({ do: 'setMessage', type: 'danger', message: result });
            return;
        }

        // if (apiResult.error) {
        //     dispatch({ do: 'setMessage', type: 'danger', message: apiResult.error });
        //     return;
        // }

        // // remember the email
        // localStorage.email = apiResult.rememberMe ? apiResult.email : '';

        // dispatch({ do: 'setMessage', type: 'success', message: 'Thank you successfully registered' });

        // // let the message sit for a bit then redirect to login
        // setTimeout(function () { setIsRegistered(true); }, 5000);
        //props.history.push('/projectdashboard');
    }

    function handleRegister() {
        register();
        //registerUser(e);
        props.history.push('/projectdashboard');
    }

    return (
        <div className="registerPage">
            {isRegistered ? <Redirect to="/login" /> : ''}

            <div className="container-left">
                <div className="title-container">
                    <h1>TaskMaster</h1>
                    <h4 style={{ color: 'grey' }}>
                        Keep your projects organized.
                    </h4>
                </div>
            </div>

            <div className="container-right">
                <div className="title-mobile">
                    <h1>TaskMaster</h1>
                </div>
                <div className="container">
                    {/* <h1>User Registration</h1> */}
                    <div className="card register-card">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <Message />
                        <div className="card-body">
                            <input type="hidden" id="db_id" value="" />
                            <div className="form-group">
                                <label for="name">First Name</label>
                                <input
                                    value={userData.firstname}
                                    onChange={handleInputChange}
                                    id="firstname"
                                    type="text"
                                    className="form-control register-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="name">Last Name</label>
                                <input
                                    value={userData.lastname}
                                    onChange={handleInputChange}
                                    id="lastname"
                                    type="text"
                                    className="form-control register-input"
                                />
                            </div>

                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    ref={inputEmail}
                                    id="email"
                                    type="email"
                                    className="form-control register-input"
                                />
                            </div>
                            <div class="form-group">
                                <label for="userPassword">Password</label>
                                <input
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    ref={inputPassword}
                                    id="password"
                                    type="password"
                                    className="form-control register-input"
                                />
                            </div>
                            <button
                                onClick={registerUser}
                                className="btn btn-outline-light submit"
                            >
                                Register
                            </button>
                            {/* <button onClick={() => handleRegister()}>Register</button> */}
                            <footer className="footer-card">
                                Already registerd?
                                <Link to="/login" className="loginBtn">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-light"
                                    >
                                        Login
                                    </button>
                                </Link>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
