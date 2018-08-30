import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../../helpers/baseURL';
import '../ViewBooks/ViewBooks.css';
import './ChangePassword.css';
import { Logout, checkIfLoggedIn } from '../../helpers/authUrls';

class ChangePassword extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    componentWillMount() {
        checkIfLoggedIn(this.props);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.state.newPassword !== this.state.confirmPassword) {
            swal('New Password Does not match Confirmation', '', 'error');
            this.setState({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } else {
            const input = {
                old_password: this.state.oldPassword,
                new_password: this.state.newPassword
            };
            axios({
                url: `${baseURL}/auth/change-password`,
                method: 'put',
                data: input,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    swal(res.data.message, '', 'success')
                        .then(() => {
                            this.props.history.push('/home/1');
                        });
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        swal(error.response.data.message, '', 'error')
                            .then(() => {
                                this.setState({
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                });
                            });
                    } else {
                        swal('An error occured. Please login and try again', '', 'error')
                            .then(() => {
                                Logout(this.props);
                            });
                    }
                });
        }
    }

    render() {
        return (
            <div className='home view-books change-password'>
                <div className='card profile container-fluid'>
                    <div className='card-header row'>
                        <h3>User Profile</h3>
                    </div>
                    <div className='card-body row'>
                        <div className="col-md-4 details">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSghLIYuD9D10fF6efoy-IU6r1ZDYtjKxJEBhTaQ_i_EV8C5waw"
                                className="rounded-circle"
                                width="300"
                                height="300"
                                alt=''/>
                            <p>
                                <h4>
                                    <b>Name:</b> {localStorage.getItem('name')}
                                    <br />
                                    <b>Role:</b> {localStorage.getItem('isAdmin') ? 'Administrator' : 'User'}
                                </h4>
                            </p>
                        </div>
                        <div className="col-md-6 password-form">
                            <h3>Change Password</h3>
                            <form onSubmit={this.submitForm} className='login-form'>
                                <div className="form-group">
                                    <label htmlFor="email">Old Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={this.state.oldPassword}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="Enter Old Password"
                                        required/>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="Enter New Password"
                                        required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="Confirm New Password"
                                        required/>
                                </div>
                                <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default ChangePassword;
