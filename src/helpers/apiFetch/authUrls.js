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
            props.history.push(`/${redirect}`);
        })
        .catch((error) => {
            alert('Failed, Please Try Again.');
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
                alert(`${res.data.message}\n${warning}`);
            } else {
                alert(`${res.data.message}`);
                props.history.push(`/${redirect}`);
            }
        })
        .catch(() => {
            alert('Registration Failed, Try Again.');
            props.history.push('/register');
        });
};
