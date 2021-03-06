import React from 'react';
import { Link } from 'react-router-dom';
import { loginPost, checkIfLoggedIn } from '../../helpers/authUrls';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        checkIfLoggedIn(this.props, '');
    }

    handleChange = (e) => {
        // Assign updated value to state
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        loginPost('login', this.state, this.props);
        // Clear state so text box clears
        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        return (
            <div className='home'>
                <h1 className='heading'>Hello Books Library</h1>
                <div className='card '>
                    <div className='card-header'>
                        <h3>Sign In</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.submitForm} className='login-form'>
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
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
                        </form>
                        <div className='footer-card'>
                            <Link to="/auth-register" className='link'>Register</Link>
                            <br />
                            <Link to="/auth-reset-password" className='link'>Forgot My Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
