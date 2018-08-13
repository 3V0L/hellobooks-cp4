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

export const returnBook = () => {
    console.log('sahjd');
};
