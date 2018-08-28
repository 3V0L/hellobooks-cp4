import axios from 'axios';
import swal from 'sweetalert';
import baseURL from './baseURL';

const URL = `${baseURL}/auth/`;

export const resetPost = (url, input, props) => {
    axios({
        url: `${URL}${url}`,
        method: 'post',
        data: input,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    })
        .then((res) => {
            swal('Success!', `${res.data.message}`, 'success')
                .then(() => {
                    props.history.push('/auth');
                });
        })
        .catch((error) => {
            if (error.response.status === 404) {
                swal('Error', 'Email does not exist. Try registering =)', 'error');
            } else {
                swal('Error', 'Failed, Please Try Again.', 'error');
            }
        });
};

export const registerPost = (url, input, props) => {
    // Warning message for incorrect details entered
    const warning = ('\nName: At least 4 characters/Alphabet Letters only\n\nPassword: At least 6 characters\n\nEmail: Formatted like me@example.com');
    // Axios request
    axios({
        url: `${URL}${url}`,
        method: 'post',
        data: input,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    })
        .then((res) => {
            if (res.status !== 201) {
                swal(`${res.data.message}`);
            } else {
                swal('Success!', `${res.data.message}`, 'success')
                    .then(() => {
                        props.history.push('/auth');
                    });
            }
        })
        .catch((error) => {
            swal('Failed',
                `Registration Failed, Please ensure your info is in the following formats:\n${warning}`,
                'warning')
                .then(() => {
                    props.history.push('/auth/register');
                });
        });
};

export const loginPost = (url, input, props) => {
    axios({
        url: `${URL}${url}`,
        method: 'post',
        data: input,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    })
        .then((res) => {
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('name', res.data.user);
            localStorage.setItem('admin', res.data.admin);
            props.history.push('/home/1');
        })
        .catch((error) => {
            if (error.response) {
                swal('Login Failed', 'Ensure all your details are correct and try again.', 'warning')
                    .then(() => {
                        localStorage.clear();
                        props.history.push('/auth');
                    });
            }
        });
};

export const checkIfLoggedIn = (props) => {
    const token = localStorage.getItem('token');
    axios({
        url: `${URL}login_check`,
        method: 'get',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.status === 200) {
                localStorage.setItem('isAllowed', true);
                if (props.history.location.pathname.includes('auth')) {
                    swal('You are logged in.', '', 'info')
                        .then(() => {
                            props.history.push('/home/1');
                        });
                }
            }
        })
        .catch((err) => {
            localStorage.setItem('isAllowed', false);
            if (!props.history.location.pathname.includes('auth')) {
                swal('You are not logged in', '', 'warning')
                    .then(() => {
                        localStorage.clear();
                        props.history.push('/auth');
                    });
            }
        });
};

export const Logout = (props) => {
    const token = localStorage.getItem('token');
    axios({
        url: `${URL}logout`,
        method: 'post',
        data: { '': '' },
        headers: {
            'Access-Control-Allow-Origin': '*',
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            swal(res.data.message, '', 'success')
                .then(() => {
                    localStorage.clear();
                    props.history.push('/auth');
                });
        })
        .catch(() => {
            localStorage.clear();
            props.history.push('/auth');
        });
};
