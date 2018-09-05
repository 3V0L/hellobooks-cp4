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
import EditBook from './Components/EditBook/EditBook';
import AddBook from './Components/AddBook/AddBook';

export default class App extends React.Component {
    render() {
        const ProtectedRoute = ({ ...props }) => (
            localStorage.getItem('isAllowed') ? <Route {...props}/> : <Redirect to="/"/>
        );

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to="/auth"/>}/>
                    <Route exact path='/auth' component={Home} />
                    <Route exact path={'/auth-register'} component={Register} />
                    <Route exact path={'/auth-reset-password'} component={ResetPassword} />
                    <div>
                        <NavBar props={this.props}/>
                        <Switch>
                            <ProtectedRoute exact path={'/home/:page'} component={ViewBooks} />
                            <ProtectedRoute exact path={'/my-history/:page'} component={BorrowingHistory} />
                            <ProtectedRoute exact path={'/return'} component={ReturnBooks} />
                            <ProtectedRoute exact path={'/change-password'} component={ChangePassword} />
                            <ProtectedRoute exact path={'/edit-book/:bookId'} component={EditBook} />
                            <ProtectedRoute exact path={'/add-book'} component={AddBook} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}
