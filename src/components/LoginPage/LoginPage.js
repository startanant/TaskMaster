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
        // props.history.push('/projectdashboard');
        props.history.push({
            pathname: '/projectdashboard',
            state: { email: 'justin@trudeau.com'}
        });
    }

    return (
        <div>
            <h1>Sign in</h1>

            <form name="form" >
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="firstName" />
                </div>
            </form>
            <form name="form" >
                <div className="form-group">
                    <label>Password</label>
                    <input type="text" name="firstName" />
                </div>
            </form>

            <button onClick={() => handleLogin()}>Click here to log in</button>
        </div>
    );

}

export default LoginPage;