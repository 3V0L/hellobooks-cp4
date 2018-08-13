import React from 'react';
import queryString from 'querystring';
import axios from 'axios';
import { baseURL } from '../../../helpers/baseURL';
import { borrowBook } from '../../../helpers/borrowUrls';
import '../ViewBooks/ViewBooks.css';
import { Logout } from '../../../helpers/authUrls';
import swal from 'sweetalert';

class BorrowingHistory extends React.Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(this.props.location.search.substr(1));
        this.state = {
            books: [],
            returned: `?returned=${params.returned}`,
        };
        if (this.state.returned === undefined) {
            this.state = { returned: '' };
        }
        this.requestBooks();
    }

    requestBooks() {
        const token = localStorage.getItem('token');
        axios({
            url: `${baseURL}/users/books${this.state.returned}`,
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
            .catch(() => {
                swal('An error occured. Please try log in again.', '', 'fail')
                    .then(() => {
                        Logout();
                    });
            });
    }

    mapBooks = () => {
        if (this.state.books === undefined || this.state.books < 1) {
            const BookDetails = (<h3 className='no-content'>You have not borrowed a book yet.</h3>);
            this.setState({ bookDetails: BookDetails });
        } else {
            const BookDetails = this.state.books.map(book => (
                <div className="panel panel-default" key={book.id}>
                    <div className="panel-heading" role="tab" id="headingOne">
                        <h4 className="panel-title">
                            <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#num' + book.isbn} aria-expanded="true" aria-controls="collapseOne">
                                {book.title} by {book.author}
                            </a>
                        </h4>
                    </div>
                    <div id={'num' + book.isbn} className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                        <div className="panel-body">
                            <table id='table1'>
                                <tbody>
                                    <tr>
                                        <th>Title:</th>
                                        <td>{book.title}</td>
                                    </tr>
                                    <tr>
                                        <th>Author:</th>
                                        <td>{book.author}</td>
                                    </tr>
                                    <tr>
                                        <th>Genre:</th>
                                        <td>{book.genre}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Published:</th>
                                        <td>{book.date_published}</td>
                                    </tr>
                                    <tr>
                                        <th>ISBN:</th>
                                        <td>{book.isbn}</td>
                                    </tr>
                                    <tr>
                                        <th>Description:</th>
                                        <td>{book.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Copies Available:</th>
                                        <td>{book.copies}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => { this.borrowBookFunction(book.id); }}>
                                Borrow this book
                            </button>
                        </div>
                    </div>
                </div>
            ));
            this.setState({ bookDetails: BookDetails });
        }
    }

    borrowBookFunction = (bookId) => {
        borrowBook(bookId, this.props);
    }

    render() {
        return (
            <div className="col-md-offset-3 col-md-6 view-books">
                <h3 className='heading'>Your Borrowing History</h3>
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    { this.state.bookDetails }
                </div>
            </div>
        );
    }
}
export default BorrowingHistory;
