import React from 'react';
import { Link } from 'react-router-dom';
import { checkIfLoggedIn, registerPost } from '../../helpers/authUrls';
import '../Home/Home.css';

class Register extends React.Component {
    state = {
        email: '',
        password: '',
        name: ''
    };

    componentWillMount() {
        checkIfLoggedIn(this.props, '');
    }

    handleChange = (e) => {
        // Assign updated value to state
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        // Submit state to registration function
        e.preventDefault();
        registerPost('register', this.state, this.props);
        this.setState({ password: '' });
    }

    render() {
        return (
            <div className='home'>
                <h1 className='heading'>Hello Books Library</h1>
                <div className='card '>
                    <div className='card-header'>
                        <h3>Register</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.submitForm} className='login-form'>
                            <div className='form-group'>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Enter Email"
                                    required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    required/>
                            </div>
                            <button id='submit' type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                        </form>
                        <div className='footer-card'>
                            <Link to="/auth" className='link'>Back to Login</Link>
                            <br />
                            <Link to="/auth-reset-password" className='link'>Forgot My Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
