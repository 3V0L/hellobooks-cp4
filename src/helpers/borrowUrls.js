import axios from 'axios';
import swal from 'sweetalert';
import baseURL from './baseURL';

const URL = `${baseURL}/users/books/`;
const token = localStorage.getItem('token');

// Calculate date for borrowing period of 35 days
const date = new Date();
date.setDate(date.getDate() + 35);
const returnDate = (new Intl.DateTimeFormat('en-GB').format(date));

export const borrowBook = (bookId, props) => {
    // Function to send a request for borrowing a book
    axios({
        url: `${URL}${bookId}`,
        method: 'post',
        data: { due_date: returnDate },
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.status === 201) {
                swal(res.data.message, '', 'success')
                    .then(() => { props.history.push('/my-history/1'); });
            }
        })
        .catch((error) => {
            swal(error.response.data.message, '', 'error');
        });
};

export const returnBook = (bookId, props) => {
    // Function for returning a book
    axios({
        url: `${URL}${bookId}`,
        method: 'put',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.status === 201) {
                swal(res.data.message, '', 'success')
                    .then(() => {
                        props.history.push('/home/1');
                    });
            }
        })
        .catch((error) => {
            if ([401, 404].includes(error.response.status)) {
                // Check for unauthorized or entry does not exist and display message
                swal(error.response.data.message, '', 'error')
                    .then(() => {
                        props.history.push('/home/1');
                    });
            } else {
                swal('An error occured. Please try again later.', '', 'error');
            }
        });
};
