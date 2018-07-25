import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Routes
import Home from './Home/Home';
// import {NavBar} from './NavBar';
import Register from './Register/Register';
import ResetPassword from './ResetPassword/ResetPassword';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/reset-password' component={ResetPassword} />
        </Switch>
    </BrowserRouter>
);
