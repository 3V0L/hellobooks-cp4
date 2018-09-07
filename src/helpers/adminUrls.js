import axios from 'axios';
import swal from 'sweetalert';
import baseURL from './baseURL';

const token = localStorage.getItem('token');

export default (bookId, bookTitle, props) => {
    // Pop up asking for book delete confirmation
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
    // Function for deleting a book
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
                    // force refresh by pushing a url then replacing it
                    props.history.push('/home');
                    props.history.replace('/home/1');
                });
        })
        .catch((error) => {
            // Check if book doesnt exist, else display error
            if (error.response.status === 404) {
                swal('Error', 'Book Does Not Exist', 'error');
            } else {
                swal(error.response.data.message, '', 'error');
            }
        });
};
