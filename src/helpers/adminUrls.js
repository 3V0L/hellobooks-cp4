import axios from 'axios';
import swal from 'sweetalert';
import baseURL from './baseURL';

const token = localStorage.getItem('token');

export const deleteBook = (bookId, bookTitle, props) => {
    swal(`Are you sure you want to delete ${bookTitle}?`, {
        buttons: {
            cancel: 'Cancel Action',
            Delete: true,
        },
    })
        .then((value) => {
            switch (value) {
            case 'Delete':
                deleteAction(bookId, props);
                break;
            default:
                swal('Action Cancelled!');
            }
        });
};

const deleteAction = (bookId, props) => {
    axios({
        url: `${baseURL}/books/${bookId}`,
        method: 'delete',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => {
            swal('Success!', `${res.data.message}`, 'success')
                .then(() => {
                    props.history.push('/home');
                    props.history.replace('/home/1');
                });
        })
        .catch((error) => {
            if (error.response.status === 404) {
                swal('Error', 'Book Does Not Exist', 'error');
            } else {
                swal(error.response.data.message, '', 'error');
            }
        });
};

export const Fake = 'Text';
