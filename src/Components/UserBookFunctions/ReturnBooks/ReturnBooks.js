import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { baseURL } from '../../../helpers/baseURL';
import '../ViewBooks/ViewBooks.css';
import { Logout } from '../../../helpers/authUrls';
import { returnBook } from '../../../helpers/borrowUrls';

class ReturnBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
        this.requestBooks();
    }

    requestBooks() {
        const token = localStorage.getItem('token');
        axios({
            url: `${baseURL}/users/books?returned=false`,
            method: 'get',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ books: res.data });
                    this.mapBooks();
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    swal('No book under this Borrow Id.', '', 'fail')
                        .then(() => {
                            window.location.replace('/hellobooks');
                        });
                } else {
                    swal('An error occured. Please try log in again.', '', 'fail')
                        .then(() => {
                            Logout();
                        });
                }
            });
    }

    mapBooks = () => {
        if (this.state.books === undefined || this.state.books < 1) {
            const BookDetails = (<h3 className='no-content'>No books to return.</h3>);
            this.state = { bookDetails: BookDetails };
        } else {
            const BookDetails = this.state.books.map(book => (
                <div className="panel panel-default" key={book.id}>
                    <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#num${book.borrow_id}`} aria-expanded="true" aria-controls="collapseOne">
                                {book.book_title} #{book.borrow_id}
                            </a>
                        </h4>
                    </div>
                    <div id={`num${book.borrow_id}`} className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                        <div className="panel-body">
                            <table id='table1'>
                                <tbody>
                                    <tr>
                                        <th>Title:</th>
                                        <td>{book.book_title}</td>
                                    </tr>
                                    <tr>
                                        <th>ISBN:</th>
                                        <td>{book.isbn}</td>
                                    </tr>
                                    <tr>
                                        <th>Due Date:</th>
                                        <td>{book.due_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Returned:</th>
                                        <td>{book.date_returned}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Borrowed:</th>
                                        <td>{book.borrow_date}</td>
                                    </tr>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => { this.returnBookFunc(book.borrow_id); }}>
                                        Return This Book
                                    </button>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ));
            this.setState({ bookDetails: BookDetails });
        }
    }

    returnBookFunc = (bookId) => {
        returnBook(bookId);
    }

    render() {
        return (
            <div className="col-md-offset-3 col-md-6 view-books">
                <h3 className='heading'>Books Due</h3>
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    { this.state.bookDetails }
                </div>
            </div>
        );
    }
}
export default ReturnBooks;
