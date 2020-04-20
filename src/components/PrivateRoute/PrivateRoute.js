import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils';
import { useGlobalStore } from '../GlobalStore/GlobalStore';


// const PrivateRoute = ({ component: Component, title, ...rest }) => {
//     return (

//         // Show the component only when the user is logged in
//         // Otherwise, redirect the user to /signin page
//         <Route {...rest} render={props => (
//             //logged_in ?
//             isLogin() ?
//                 <Component {...props} title={title}/>
//                 : <Redirect to="/login" />
//         )} />
//     );
// };

function PrivateRoute({ component: Component, title, ...rest }) {
    const [globalData, dispatch] = useGlobalStore();
    console.log(globalData.loggedIn);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            //logged_in ?
            globalData.loggedIn ?
                <Component {...props} title={title} />
                : <Redirect to="/login" />
        )} />
    );

}

export default PrivateRoute;