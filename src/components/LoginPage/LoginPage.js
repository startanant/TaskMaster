import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { login } from '../../utils';

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

function LoginPage (props) {

    const [userData, setUserData] = useState({email: "", password: ""});
    const inputEmail = useRef();
    const inputPassword = useRef();

    function handleInputChange(e) {
        const { id, value } = e.target; //

        setUserData({ ...userData, [id]: value });
    }

    async function m_login() {
        let testUser = {
            "email": "tomcruise2@tom.com",
            "name": "tommy",
            "firstname": "Tom",
            "lastname": "Cruise",
            "password": "myOwnSecret@1"
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

    function handleLogin(){
        //m_login();
        login();
        let email = 'justin@trudeau.com';
        // props.history.push('/projectdashboard');
        localStorage.setItem('email', email);
        props.history.push({
            pathname: '/projectdashboard',
            state: { email: email}
        });
    }

    async function loginUser(e) {
        e.preventDefault();

        if (userData.email === "") {
            inputEmail.focus();
            // dispatch({ do: 'setMessage', type: 'danger', message: 'Please enter your email!' });
            alert('Please enter your email!');
            return;
        }

        if (userData.password === "" || userData.password.length < 1) {
            inputPassword.current.focus();
            //dispatch({ do: 'setMessage', type: 'danger', message: 'Please enter your password!' });
            alert('Please enter your password!');
            return;
        }

        //const apiResult = await API.post('/api/user/login', userData);

        // if (apiResult.error) {
        //     dispatch({ do: 'setMessage', type: 'danger', message: apiResult.error });
        //     // clear any session
        //     localStorage.session = '';
        //     return;
        // };

        //loginComplete(apiResult);
        console.log(userData);
        const url = '/api/login';
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
        // console.log(result);
        // console.log(result[0].email);
        let email = result[0].email;
        localStorage.setItem('email', email);
        props.history.push({
            pathname: '/projectdashboard',
            state: { email: email }
        });

    }

    return (
        <div>
            <div class="container">
                <h1>Login</h1>
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <form role="form">
                            <input type='hidden' id='db_id' value='' />
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    ref={inputEmail}
                                    id="email" type="email" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="userPassword">Password</label>
                                <input
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    ref={inputPassword}
                                    id="password" type="password" class="form-control" />
                            </div>
                            <button onClick={loginUser} type="button" class="btn btn-primary submit">Login</button>
                        </form>
                    </div>
                </div>

                {/* <button onClick={() => handleLogin()}>Click here to log in</button> */}
            </div>
        </div>
    );

}

export default LoginPage;