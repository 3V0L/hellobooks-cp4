import axios from 'axios';
import swal from 'sweetalert';

const baseURL = 'http://0.0.0.0:5000/api/v1/auth/';

export const resetPost = (url, input, redirect) => {
    axios({
        url: `${baseURL}${url}`,
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
                    window.location.replace(`/auth/${redirect}`);
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

export const registerPost = (url, input, redirect) => {
    // Warning message for incorrect details entered
    const warning = ('\nName: At least 4 characters/Alphabet Letters only\n\nPassword: At least 6 characters\n\nEmail: Formatted like me@example.com');
    // Axios request
    axios({
        url: `${baseURL}${url}`,
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
                        window.location.replace(`/auth/${redirect}`);
                    });
            }
        })
        .catch((error) => {
            swal('Failed',
                `Registration Failed, Please ensure your info is in the following formats:\n${warning}`,
                'warning')
                .then(() => {
                    window.location.replace('/auth/register');
                });
        });
};

export const loginPost = (url, input, redirect) => {
    axios({
        url: `${baseURL}${url}`,
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
            window.location.replace(`/${redirect}`);
        })
        .catch((error) => {
            if (error.response) {
                swal('Login Failed', 'Ensure all your details are correct and try again.', 'warning')
                    .then(() => {
                        localStorage.clear();
                        window.location.replace('/auth');
                    });
            }
        });
};

export const checkIfLoggedIn = () => {
    const token = localStorage.getItem('token');
    axios({
        url: `${baseURL}login_check`,
        method: 'get',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.status === 200) {
                swal(res.data.message, 'Log Out to access this page', 'warning')
                    .then(() => {
                        window.location.replace('/hellobooks');
                    });
            }
        })
        .catch(() => {
        });
};

export const Logout = () => {
    const token = localStorage.getItem('token');
    axios({
        url: `${baseURL}logout`,
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
                    window.location.replace('/auth');
                });
        })
        .catch((error) => {
            localStorage.clear();
            window.location.replace('/auth');
        });
};
