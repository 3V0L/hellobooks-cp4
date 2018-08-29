import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import '../Home/Home.css';
import { checkIfLoggedIn } from '../../helpers/authUrls';
import baseURL from '../../helpers/baseURL';
import './AddBook.css';

class AddBook extends React.Component {
    state = {
        title: '',
        author: '',
        date_published: '',
        genre: '',
        description: '',
        isbn: '',
        copies: ''
    };

    componentWillMount() {
        checkIfLoggedIn(this.props);
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
                    url: `${baseURL}/books`,
                    method: 'post',
                    data: this.state,
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
                        if (error.response.status === 409) {
                            swal(error.response.data.message, '', 'error')
                                .then(() => { this.props.history.push('/home/1'); });
                        } else {
                            swal(error.response.data.message, '', 'error');
                        }
                    });
            });
    }

    render() {
        return (
            <div className='home'>
                <div className='book-card card'>
                    <div className='card-header'>
                        <h3>Add A Book</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.submitForm} className='login-form'>
                            <div className='form-group'>
                                <label htmlFor="title">Book Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    required/>
                                <span class="help-block">
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
                                    className="form-control"
                                    required/>
                                <span class="help-block">
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
                                    className="form-control"
                                    required/>
                                <span class="help-block">
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
                                    className="form-control"
                                    required/>
                                <span class="help-block">
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
                                    className="form-control"
                                    required/>
                                <span class="help-block">
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
                                    required
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
                                    required/>
                                <span class="help-block">
                                4 - 200 Characters. All types of characters allowed
                                </span>
                            </div>
                            <button type="submit" className="btn btn-dark btn-lg btn-block">Add Book</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddBook;
