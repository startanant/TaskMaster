import React, { Component } from 'react';
import { logout, isLogin } from '../../utils';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';

// function Home() {
//     return (
//         <>
//             Home
//         </>
//     );
    
// }

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        }
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false
        })
    }

    render() {
        return (
            <div>
                <h1>Welcome To TaskMaster</h1><hr></hr>
                <h3>The world's #1 task manager to track the progress of your teams and projects.</h3>


                {this.state.isLogin ?
                    <button onClick={() => this.handleLogout()}>Click here to log out</button>
                    : <><Link to="/login">Login</Link> | <Link to="/register">Register</Link></>
                }
            </div>
        );
    }
}

export default Home;