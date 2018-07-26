import React from 'react';

class ViewBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    render() {
        return (
            <h1>You are now in the system</h1>
        );
    }
}
export default ViewBooks;
