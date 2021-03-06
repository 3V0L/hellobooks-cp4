import React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../../helpers/authUrls';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        let AdminNav = '';
        if (localStorage.getItem('admin') === 'true') {
            // Check if user is admin and display add book function
            AdminNav = (
                <li className="nav-item">
                    <Link
                        to="/add-book"
                        className="nav-link">
                        Add Book
                    </Link>
                </li>
            );
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <h2>HelloBooks</h2>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link
                                to="/home/1"
                                className="nav-link">
                                Home
                            </Link>
                        </li>
                        {AdminNav}
                        <li className="nav-item">
                            <Link
                                to="/my-history/1"
                                className="nav-link">
                                My Borrowing history
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/return"
                                className="nav-link">
                                Return Book
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/change-password"
                                className="nav-link">
                                Change Password
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/auth"
                                onClick={() => { Logout(this.props); } }
                                className="nav-link">
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;
