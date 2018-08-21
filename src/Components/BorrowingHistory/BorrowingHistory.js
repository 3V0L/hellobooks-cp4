import React from 'react';
import queryString from 'querystring';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../../helpers/baseURL';
import '../ViewBooks/ViewBooks.css';
import { Logout } from '../../helpers/authUrls';

class BorrowingHistory extends React.Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(this.props.location.search.substr(1));
        this.state = {
            books: [],
            page: parseInt(params.page, 10),
        };
        if (Number.isInteger(this.state.page) === false) {
            this.state = { page: 1 };
        }
        this.requestBooks();
    }

    componentDidMount() {
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
                    swal('No more pages.', '', 'fail')
                        .then(() => {
                            const prevPage = this.state.page - 1;
                            window.location.replace(`/hellobooks/my-history?page=${prevPage}`);
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
            const BookDetails = (<h3 className='no-content'>You have not borrowed a book yet.</h3>);
            this.setState({ bookDetails: BookDetails });
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ));
            this.setState({ bookDetails: BookDetails });
        }
    }

    paginator = () => {
        const prevPage = this.state.page - 1;
        const nextPage = this.state.page + 1;
        if (this.state.page !== 1) {
            const Paginator = (
                <ul className="pagination">
                    <li className="page-item">
                        <Link
                            to={`/hellobooks/my-history?page=${prevPage}`}
                            className="page-link">
                            Previous
                        </Link>
                    </li>
                    <li className="page-item"><a className="page-link active">Page {this.state.page}</a></li>
                    <li className="page-item">
                        <Link
                            to={`/hellobooks/my-history?page=${nextPage}`}
                            className="page-link">
                            Next
                        </Link>
                    </li>
                </ul>
            );
            this.setState({ paginator: Paginator });
        } else {
            const Paginator = (
                <ul className="pagination">
                    <li className="page-item"><a className="page-link active">Page {this.state.page}</a></li>
                    <li className="page-item">
                        <Link
                            to={`/hellobooks/my-history?page=${nextPage}`}
                            className="page-link">
                            Next
                        </Link>
                    </li>
                </ul>
            );
            this.setState({ paginator: Paginator });
        }
    }

    render() {
        return (
            <div className="col-md-offset-3 col-md-6 view-books">
                <h3 className='heading'>Your Borrowing History</h3>
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    { this.state.bookDetails }
                </div>
                <nav>
                    { this.state.paginator }
                </nav>
            </div>
        );
    }
}
export default BorrowingHistory;
