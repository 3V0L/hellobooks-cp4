import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    render() {
        return (
            <h1>Nav Goes here</h1>
        );
    }
}
export default NavBar;
