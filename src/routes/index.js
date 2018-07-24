import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Import Routes
import {Home} from './Home';
//import {NavBar} from './NavBar';
import {Register} from './Register'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
        </Switch>
    </BrowserRouter>
)