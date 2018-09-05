import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../../helpers/baseURL';
import '../ViewBooks/ViewBooks.css';
import { Logout, checkIfLoggedIn } from '../../helpers/authUrls';

class BorrowingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            page: parseInt(this.props.match.params.page, 10),
            paginator: '',
        };
        if (Number.isInteger(this.state.page) === false || this.state.page < 1) {
            this.state = { page: 1 };
        }
    }

    componentDidMount() {
        checkIfLoggedIn(this.props, 'auth');
        this.requestBooks();
        this.paginator();
    }

    requestBooks() {
        const token = localStorage.getItem('token');
        axios({
            url: `${baseURL}/users/books?page=${this.state.page}`,
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
                    swal('No more pages.', '', 'error')
                        .then(() => {
                            this.changePage((this.state.page - 1));
                        });
                } else {
                    swal('An error occured. Please try log in again.', '', 'error')
                        .then(() => {
                            Logout(this.props);
                        });
                }
            });
    }

    changePage = (pageNum) => {
        this.setState({ page: parseInt(pageNum, 10) },
            () => {
                this.props.history.push(`/my-history/${pageNum}`);
                this.requestBooks();
                this.paginator();
            });
    }

    mapBooks = () => {
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
                </tr>
            ));
            this.setState({ bookDetails: BookDetails });
        }
    }

    paginator = () => {
        const prevPage = this.state.page - 1;
        const nextPage = this.state.page + 1;
        if (this.state.page !== 1) {
            const Paginator = (
                <div className="btn-group pagination" role="group" aria-label="Basic example">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => { this.changePage(prevPage); }}
                    >
                        Previous
                    </button>
                    <button type="button" className="btn btn-dark" disabled>Page {this.state.page}</button>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => { this.changePage(nextPage); }}
                    >
                        Next
                    </button>
                </div>
            );
            this.setState({ paginator: Paginator });
        } else {
            const Paginator = (
                <div className="btn-group pagination" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-light" disabled>Previous</button>
                    <button type="button" className="btn btn-dark" disabled>Page {this.state.page}</button>
                    <button
                        id='next'
                        type="button"
                        className="btn btn-light"
                        onClick={() => { this.changePage(nextPage); }}
                    >
                        Next
                    </button>
                </div>
            );
            this.setState({ paginator: Paginator });
        }
    }

    render() {
        return (
            <div className="col-md-offset-3 col-md-9 view-books table-responsive">
                <h3 className='heading'>Borrowing History</h3>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#Borrow ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Date Returned</th>
                            <th scope="col">Borrow Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.bookDetails }
                    </tbody>
                </table>
                <nav>
                    { this.state.paginator }
                </nav>
            </div>
        );
    }
}
export default BorrowingHistory;
