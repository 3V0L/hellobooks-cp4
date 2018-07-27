import axios from 'axios';

const baseURL = 'http://0.0.0.0:5000/api/v1/auth/';

export const resetPost = (url, input, props, redirect) => {
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
            alert(`${res.data.message}`);
            props.history.push(`/auth/${redirect}`);
        })
        .catch((error) => {
            if (error.response.status === 404) {
                alert('Email does not exist. Try registering =)');
            } else {
                alert('Failed, Please Try Again.');
            }
        });
};

export const registerPost = (url, input, props, redirect) => {
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
                alert(`${res.data.message}`);
            } else {
                alert(`${res.data.message}`);
                props.history.push(`/auth/${redirect}`);
            }
        })
        .catch((error) => {
            alert(`Registration Failed, Please ensure your info is in the following formats:\n${warning}`);
            props.history.push('/auth/register');
        });
};

export const loginPost = (url, input, props, redirect) => {
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
            props.history.push(`/${redirect}`);
        })
        .catch((error) => {
            if (error.response) {
                alert('Login Failed. Ensure all your details are correct and try again.');
                props.history.push('/auth');
            }
        });
};

export const checkIfLoggedIn = (props) => {
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
                alert(res.data.message);
                props.history.push('hellobooks');
            }
        })
        .catch(() => {
        });
};
