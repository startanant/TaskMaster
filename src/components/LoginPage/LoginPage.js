import React from 'react';
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
                                <label for="name">Email</label>
                                {/* <input value={userData.name} onChange={handleInputChange} id='name' type="text" class="form-control" /> */}
                                <input type="text" />
                            </div>
                            <div class="form-group">
                                <label for="email">Password</label>
                                {/* <input
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    ref={inputEmail}
                                    id="email" type="email" class="form-control" /> */}
                                <input type="text" />
                            </div>
                        </form>
                    </div>
                </div>

                <button onClick={() => handleLogin()}>Click here to log in</button>
            </div>
        </div>
    );

}

export default LoginPage;