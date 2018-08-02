import React from 'react';
import { Link } from 'react-router-dom';
import { loginPost, checkIfLoggedIn } from '../../helpers/authUrls';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentWillMount() {
        checkIfLoggedIn(this.props);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        loginPost('login', this.state, 'hellobooks');
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

                <Link to="/auth/register" >
                    <button type='button'>Register </button>
                </Link>
                <br/><br/>
                <Link to="/auth/reset-password">Forgot My Password</Link>
            </div>
        );
    }
}

export default Home;
