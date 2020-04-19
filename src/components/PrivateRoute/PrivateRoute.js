import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils';

const PrivateRoute = ({ component: Component, title, ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} title={title}/>
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;