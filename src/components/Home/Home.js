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
                <h1>Welcome To TaskMaster</h1>

                {this.state.isLogin ?
                    <button onClick={() => this.handleLogout()}>Click here to log out</button>
                    : <Link to="/login">Go to sign in page</Link>
                }
            </div>
        );
    }
}

export default Home;