import React from 'react';
import { Link } from 'react-router-dom';
import { registerPost } from '../../helpers/apiFetch/authUrls';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm(e) {
        e.preventDefault();
        registerPost('register', this.state, this.props, '');
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={this.submitForm}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required/>
                    <br/>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.handleChange}
                        required/>
                    <br />
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required/>
                    <br/><br/>
                    <input type="submit" value="Submit" />
                </form>

                <Link to="/" >
                    <button type='button'>Back to Login Page</button>
                </Link>
                <br/><br/>
                <Link to="/reset-password">Forgot My Password</Link>
            </div>
        );
    }
}
export default Register;
