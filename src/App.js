import React from 'react';
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom';

// Import Routes
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Register from './Components/Register/Register';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ViewBooks from './Components/ViewBooks/ViewBooks';
import BorrowingHistory from './Components/BorrowingHistory/BorrowingHistory';
import ReturnBooks from './Components/ReturnBooks/ReturnBooks';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/hellobooks' component={HelloBooks} />
        </Switch>
    </BrowserRouter>
);

const Auth = ({ match }) => {
    const authUrls = (
        <Switch>
            <Route exact path={`${match.url}`} component={Home} />
            <Route exact path={`${match.url}/register`} component={Register} />
            <Route exact path={`${match.url}/reset-password`} component={ResetPassword} />
        </Switch>
    );
    return authUrls;
};

const HelloBooks = ({ match }) => {
    const helloBooksUrls = (
        <div>
            <NavBar />
            <Switch>
                <Route exact path={`${match.url}/home/:page`} component={ViewBooks} />
                <Route exact path={`${match.url}/my-history/:page`} component={BorrowingHistory} />
                <Route exact path={`${match.url}/return`} component={ReturnBooks} />
            </Switch>
        </div>
    );
    return helloBooksUrls;
};
