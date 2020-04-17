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

    function handleLogin(){
        login();
        props.history.push('/projectdashboard');
    }

    return (
        <div>
            <h1>Register</h1>

            <button onClick={() => handleLogin()}>Click here to register</button>
        </div>
    );

}

export default RegisterPage;