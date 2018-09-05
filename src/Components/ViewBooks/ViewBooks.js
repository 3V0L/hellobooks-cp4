import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../../helpers/baseURL';
import { borrowBook } from '../../helpers/borrowUrls';
import './ViewBooks.css';
import { deleteBook } from '../../helpers/adminUrls';
import { Logout } from '../../helpers/authUrls';

class ViewBooks extends React.Component {
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
        this.requestBooks();
        this.paginator();
    }

    requestBooks = () => {
        const token = localStorage.getItem('token');
        axios({
            url: `${baseURL}/books?page=${this.state.page}`,
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
                            const prevPage = this.state.page - 1;
                            this.changePage(prevPage);
                        });
                } else {
                    swal('You are not logged in.', '', 'error')
                        .then(() => {
                            Logout(this.props);
                        });
                }
            });
    }

    changePage = (pageNum) => {
        this.setState({ page: parseInt(pageNum, 10) },
            () => {
                this.props.history.push(`/home/${pageNum}`);
                this.requestBooks();
                this.paginator();
            });
    }

    paginator = () => {
        const prevPage = this.state.page - 1;
        const nextPage = this.state.page + 1;
        if (this.state.page !== 1) {
            const Paginator = (
                <div className="btn-group pagination" role="group" aria-label="Basic example">
                    <button
                        type="button"
                        clasclassNames="btn btn-light"
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

    mapBooks = () => {
        if (this.state.books === undefined || this.state.books < 1) {
            const BookDetails = (<h3 className='no-content'>No Books Here.</h3>);
            this.setState({ bookDetails: BookDetails });
        } else {
            const BookDetails = this.state.books.map(book => (
                <tr key={book.id}>
                    <th scope="row">{book.id}</th>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.date_published}</td>
                    <td>{book.isbn}</td>
                    <td>{book.description}</td>
                    <td>{book.copies}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => { this.borrowBookFunction(book.id); }}>
                            Borrow this book
                        </button>
                        { localStorage.getItem('admin') === 'true'
                            ? <div className='admin-actions'>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm admin-btn"
                                    onClick={() => this.props.history.push(`/edit-book/${book.id}`) }
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteBook(book.id, book.title, this.props)}
                                >
                                    Delete
                                </button>
                            </div>
                            : ''}
                    </td>
                </tr>
            ));
            this.setState({ bookDetails: BookDetails });
        }
    }

    borrowBookFunction = (bookId) => {
        borrowBook(bookId, this.props);
    }

    render() {
        return (
            <div className="col-md-offset-3 col-md-9 view-books table-responsive">
                <h3 className='heading'>Available Books</h3>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Date Published</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Description</th>
                            <th scope="col">Copies Available</th>
                            <th scope="col">Actions</th>
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
export default ViewBooks;
