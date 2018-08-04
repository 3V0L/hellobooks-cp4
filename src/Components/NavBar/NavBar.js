import React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../../helpers/authUrls';
import './NavBar.css';

let AdminNav = '';
if (localStorage.getItem('admin') === 'true') {
    AdminNav = (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Admin Actions
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="">View All Users</a>
                <a className="dropdown-item" href="">View All Books Loaned Out</a>
            </div>
        </li>
    );
}

const UserNav = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href=""><h2>HelloBooks</h2></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
            <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                    <a className="nav-link" href="">Home</a>
                </li>
                {AdminNav}
                <li className="nav-item">
                    <a className="nav-link" href="">My Borrowing history</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Change Password</a>
                </li>
                <li>
                    <Link
                        to="/hellobooks"
                        onClick={Logout}
                        className="nav-link">
                        Log Out
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default () => UserNav;
