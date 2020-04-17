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
            <div className="col-lg-8 offset-lg-2">
                <h2>Register</h2>
                <form name="form" >
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName"  />
                    </div>
                    
                </form>
                <form name="form" >
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="firstName" />
                    </div>
                </form>
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
            </div>

            <button onClick={() => handleLogin()}>Register</button>
        </div>
    );

}

export default RegisterPage;