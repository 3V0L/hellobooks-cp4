import React from 'react';
import { Link } from 'react-router-dom';
import { checkIfLoggedIn, resetPost } from '../../helpers/authUrls';
import '../Home/Home.css';

class ResetPassword extends React.Component {
    state = {
        email: ''
    };

    componentWillMount() {
        checkIfLoggedIn(this.props);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        resetPost('reset-password', this.state, '', this.props);
    }

    render() {
        return (
            <div className='home'>
                <h1 className='heading'>Hello Books Library</h1>
                <div className='card '>
                    <div className='card-header'>
                        <h3>Reset Password</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.submitForm} className='login-form'>
                            <div className="form-group">
                                <label for="email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Enter Email"
                                    required/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
                        </form>
                        <div className='footer-card'>
                            <Link to="/auth" className='link'>Login</Link>
                            <br />
                            <Link to="/auth/register" className='link'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ResetPassword;
