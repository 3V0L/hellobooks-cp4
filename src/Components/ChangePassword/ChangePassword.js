import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../../helpers/baseURL';
import '../ViewBooks/ViewBooks.css';
import { Logout } from '../../helpers/authUrls';

class ChangePassword extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

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
                            this.props.history.push('/hellobooks/home/1');
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
                <div className='card'>
                    <div className='card-header'>
                        <h3>Change Password</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.submitForm} className='login-form'>
                            <div className="form-group">
                                <label for="email">Old Password</label>
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
                                <label for="newPassword">New Password</label>
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
                                <label for="confirmPassword">Confirm New Password</label>
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
        );
    }
}
export default ChangePassword;
