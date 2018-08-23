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
import ChangePassword from './Components/ChangePassword/ChangePassword';
import { checkIfLoggedIn } from './helpers/authUrls';

export default class App extends React.Component {
    render() {
        // const Routes = () => (
        //     <Switch>
        //         <Route path='/auth' component={Auth} />
        //         <Route path='/hellobooks' component={HelloBooks} />
        //     </Switch>
        // );

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
                    { checkIfLoggedIn(this.props) }
                    <Switch>
                        <Route exact path={`${match.url}/home/:page`} component={ViewBooks} />
                        <Route exact path={`${match.url}/my-history/:page`} component={BorrowingHistory} />
                        <Route exact path={`${match.url}/return`} component={ReturnBooks} />
                        <Route exact path={`${match.url}/change-password`} component={ChangePassword} />
                    </Switch>
                </div>
            );
            return helloBooksUrls;
        };

        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/auth' component={Auth} />
                    <Route path='/hellobooks' component={HelloBooks} />
                </Switch>
            </BrowserRouter>
        );
    }
}
