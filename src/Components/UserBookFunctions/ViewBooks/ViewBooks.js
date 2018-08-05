import React from 'react';
import queryString from 'querystring';
import axios from 'axios';
import { baseURL } from '../../../helpers/baseURL';

class ViewBooks extends React.Component {
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
    }

    componentDidMount() {
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
                    console.log(this.state.books);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <br/><br/><br/><br/><br/><br/>
                <h1>You are now in the system {this.state.page}</h1>
            </div>
        );
    }
}
export default ViewBooks;
