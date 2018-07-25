import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/**
* Component Displaying Login page
*/
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm(e) {
        e.preventDefault();
        axios({
            url: 'http://0.0.0.0:5000/api/v1/auth/login',
            method: 'post',
            data: this.state,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    alert('Logged in!');
                    this.props.history.push('/');
                } else {
                    const textAlert = `Login Failed. ${res.data.message}`;
                    alert(textAlert);
                }
            })
            .catch(() => {
                alert('Login Failed. Please Try Again.');
                this.setState({
                    email: '',
                    password: ''
                });
            });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.submitForm}>
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

                <Link to="/register" >
                    <button type='button'>Register </button>
                </Link>
                <br/><br/>
                <Link to="/reset-password">Forgot My Password</Link>
            </div>
        );
    }
}

export default Home;
