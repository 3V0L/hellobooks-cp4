import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../../helpers/baseURL';
import '../ViewBooks/ViewBooks.css';
import { checkIfLoggedIn } from '../../helpers/authUrls';
import { returnBook } from '../../helpers/borrowUrls';

class ReturnBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookDetails: '',
        };
    }

    componentDidMount() {
        checkIfLoggedIn(this.props, 'auth');
        this.requestBooks();
    }

    requestBooks() {
        // Request books to return
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
                    // Set books as state and map them to table
                    this.setState({ books: res.data },
                        () => this.mapBooks());
                }
            })
            .catch((error) => {
                swal(error.response.data.message, '', 'error');
            });
    }

    mapBooks = () => {
        // Map books to table rows
        if (this.state.books === undefined || this.state.books < 1) {
            const BookDetails = (<h3 className='no-content'>You have not borrowed a book yet.</h3>);
            this.setState({ bookDetails: BookDetails });
        } else {
            const BookDetails = this.state.books.map(book => (
                <tr key={book.borrow_id}>
                    <th scope="row">{book.borrow_id}</th>
                    <td>{book.book_title}</td>
                    <td>{book.isbn}</td>
                    <td>{book.due_date}</td>
                    <td>{book.date_returned}</td>
                    <td>{book.borrow_date}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => { this.returnBookFunc(book.borrow_id); }}>
                            Return This Book
                        </button>
                    </td>
                </tr>
            ));
            this.setState({ bookDetails: BookDetails });
        }
    }

    returnBookFunc = (bookId) => {
        returnBook(bookId, this.props);
    }

    render() {
        return (
            <div className="col-md-offset-3 col-md-9 view-books table-responsive">
                <h3 className='heading'>Books Due</h3>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#Borrow ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Date Returned</th>
                            <th scope="col">Borrow Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.bookDetails }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ReturnBooks;
