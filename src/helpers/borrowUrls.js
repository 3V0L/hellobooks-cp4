import axios from 'axios';
import swal from 'sweetalert';
import { baseURL } from './baseURL';

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
            console.log(props);
            console.log(res.data);
            window.location.replace('/hellobooks/my-history');
        })
        .catch((error) => {
            console.log(error.response);
        });
};

export const returnBook = (bookId) => {
    axios({
        url: `${baseURL}/users/books/${bookId}`,
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
                    .then(() =>{
                        window.location.replace('/hellobooks');
                    });
            }
        })
        .catch((error) => {
            if ([401, 404].includes(error.response.status)) {
                swal(error.response.data.message, '', 'fail')
                    .then(() => {
                        window.location.replace('/hellobooks');
                    });
            } else {
                swal('An error occured. Please try again.', '', 'fail');
            }
        });
};
