import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Routes
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import Register from './Register/Register';
import ResetPassword from './ResetPassword/ResetPassword';
import ViewBooks from './UserBookFunctions/ViewBooks/ViewBooks';
import BorrowingHistory from './UserBookFunctions/BorrowingHistory/BorrowingHistory';
import ReturnBooks from './UserBookFunctions/ReturnBooks/ReturnBooks';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/hellobooks' component={HelloBooks} />
        </Switch>
    </BrowserRouter>
);

const Auth = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={Home} />
            <Route exact path={`${match.url}/register`} component={Register} />
            <Route exact path={`${match.url}/reset-password`} component={ResetPassword} />
        </Switch>
    );
};

const HelloBooks = ({ match }) => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path={`${match.url}`} component={ViewBooks} />
                <Route exact path={`${match.url}/my-history`} component={BorrowingHistory} />
                <Route exact path={`${match.url}/return`} component={ReturnBooks} />
            </Switch>
        </div>
    );
};
