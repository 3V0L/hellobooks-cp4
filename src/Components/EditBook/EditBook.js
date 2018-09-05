import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import '../Home/Home.css';
import { checkIfLoggedIn } from '../../helpers/authUrls';
import '../AddBook/AddBook.css';
import baseURL from '../../helpers/baseURL';

class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: parseInt(this.props.match.params.bookId, 10),
            title: '',
            author: '',
            date_published: '',
            genre: '',
            description: '',
            isbn: '',
            copies: ''
        };
        if (isNaN(this.props.match.params.bookId)) {
            swal('There is no book with that #ID!', '', 'error')
                .then(() => {
                    props.history.push('/home/1');
                });
        }
    }

    componentDidMount() {
        checkIfLoggedIn(this.props, 'auth');
        const token = localStorage.getItem('token');
        axios({
            url: `${baseURL}/books/${parseInt(this.props.match.params.bookId, 10)}`,
            method: 'get',
            data: this.state,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        title: res.data.title,
                        author: res.data.author,
                        date_published: res.data.date_published.split('/').reverse().join('-'),
                        genre: res.data.genre,
                        description: res.data.description,
                        isbn: res.data.isbn,
                        copies: res.data.copies,
                    });
                } else {
                    swal(res.data.message, 'Enter info according to the helpers below the textbox', 'info');
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    swal(error.response.data.message, '', 'error')
                        .then(() => { this.props.history.push('/home/1'); });
                } else {
                    swal(error.response.data.message, '', 'error');
                }
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ date_published: this.state.date_published.split('-').reverse().join('/') },
            () => {
                const token = localStorage.getItem('token');
                axios({
                    url: `${baseURL}/books/${this.state.bookId}`,
                    method: 'put',
                    data: {
                        title: this.state.title,
                        author: this.state.author,
                        date_published: this.state.date_published,
                        genre: this.state.genre,
                        description: this.state.description,
                        isbn: this.state.isbn,
                        copies: this.state.copies.toString(),
                    },
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        if (res.status === 201) {
                            swal(res.data.message, '', 'success')
                                .then(() => { this.props.history.push('/home/1'); });
                        } else {
                            swal(res.data.message, 'Enter info according to the helpers below the textbox', 'info');
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            swal(`${error.response.data.message} This is as seen below the inputs`, '', 'error')
                                .then(() => { this.props.history.push('/home/1'); });
                        } else {
                            swal(error.response.data.message, '', 'error')
                                .then(() => { this.props.history.push('/home/1'); });
                        }
                    });
            });
    }

    render() {
        return (
            <div className='home'>
                <div className='book-card card'>
                    <div className='card-header'>
                        <h3>Edit Book</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.submitForm} className='login-form'>
                            <div className='form-group'>
                                <label htmlFor="title">Book Title</label>
                                <input
                                    id='title'
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                                <span className="help-block">
                                4 - 25 characters. No special characters (e.g. !,@,#,? etc)
                                </span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter Author"
                                    value={this.state.author}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                                <span className="help-block">
                                4 - 25 text only characters (a-z, A-Z)
                                </span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="genre">Genre</label>
                                <input
                                    type="text"
                                    name="genre"
                                    placeholder="Enter Genre"
                                    value={this.state.genre}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                                <span className="help-block">
                                    4 - 20 text only characters (a-z, A-Z)
                                </span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="isbn">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    placeholder="Enter ISBN"
                                    value={this.state.isbn}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                                <span className="help-block">
                                13 Digit ISBN number with no special characters (e.g 1234567891011)
                                </span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="copies">Number of Copies</label>
                                <input
                                    type="number"
                                    name="copies"
                                    placeholder="Enter Copies"
                                    value={this.state.copies}
                                    onChange={this.handleChange}
                                    className="form-control"/>
                                <span className="help-block">
                                Positive numbers only
                                </span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="date_published">Date Published</label>
                                <input
                                    type="date"
                                    name="date_published"
                                    value={this.state.date_published}
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    rows='5'
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                                <span className="help-block">
                                4 - 200 Characters. All types of characters allowed
                                </span>
                            </div>
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditBook;
