import React from 'react';
import {
    BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';

// Import Routes
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Register from './Components/Register/Register';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ViewBooks from './Components/ViewBooks/ViewBooks';
import BorrowingHistory from './Components/BorrowingHistory/BorrowingHistory';
import ReturnBooks from './Components/ReturnBooks/ReturnBooks';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import NotFound from './Components/NotFound/NotFound';
import { checkIfLoggedIn } from './helpers/authUrls';

export default class App extends React.Component {
    render() {
        const ProtectedRoute = ({ ...props }) => (
            localStorage.getItem('isAllowed') ? <Route {...props}/> : <Redirect to="/"/>
        );

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/auth' component={Home} />
                    <Route exact path={'/auth-register'} component={Register} />
                    <Route exact path={'/auth-reset-password'} component={ResetPassword} />
                    <div>
                        <NavBar />
                        { checkIfLoggedIn(this.props) }
                        <Switch>
                            <ProtectedRoute exact path={'/home/:page'} component={ViewBooks} />
                            <ProtectedRoute exact path={'/my-history/:page'} component={BorrowingHistory} />
                            <ProtectedRoute exact path={'/return'} component={ReturnBooks} />
                            <ProtectedRoute exact path={'/change-password'} component={ChangePassword} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}
