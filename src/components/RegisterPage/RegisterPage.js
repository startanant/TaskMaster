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

function RegisterPage (props) {

    async function register(){
        let testUser = {
            "email": "justin@trudeau.com",
            "name":"justin",
            "firstname":"Justin",
            "lastname":"Trudeau",
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
        register();
        props.history.push('/projectdashboard');
    }

    return (
        <div>
            <div class="container">
                <h1>User Registration</h1>
                <div class="card">
                    <div class="card-header">
                        Register
                    </div>
                    <div class="card-body">
                        <form role="form">
                            <input type='hidden' id='db_id' value='' />
                            <div class="form-group">
                                <label for="name">First Name</label>
                                {/* <input value={userData.name} onChange={handleInputChange} id='name' type="text" class="form-control" /> */}
                                <input type="text" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                {/* <input
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    ref={inputEmail}
                                    id="email" type="email" class="form-control" /> */}
                                <input type="text" />
                            </div>
                            <div class="form-group">
                                <label for="userPassword">Password</label>
                                {/* <input
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    ref={inputPassword}
                                    id="password" type="password" class="form-control" /> */}
                                <input type="text" />
                            </div>
                            {/* <button onClick={registerUser} class="btn btn-primary submit" >Register</button> */}
                            <button onClick={() => handleLogin()}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );

}

export default RegisterPage;