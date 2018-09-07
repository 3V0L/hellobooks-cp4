import React from 'react';
import { Link } from 'react-router-dom';
import '../ViewBooks/ViewBooks.css';

const NotFound = () => (
    // 404 Page
    <div>
        <center>
            <h1 className='err404'>404: Page Not Found</h1>
            <h2><Link to="/auth">Return to Login</Link></h2>
        </center>
    </div>
);

export default NotFound;
