import React from 'react';

export class Register extends React.Component{
    render() {
        return(
            <div class='row-fluid'>
                <h3>Sign Up</h3>
                <form action="">
                    Name:
                    <input type="text" name="firstname" value="" required/>
                    <br/>
                    Email:
                    <input type="email" name="email" value="" required/>
                    <br />
                    Password:
                    <input type="password" name="password" value="" required/>
                    <br/><br/>
                    <input type="submit" value="Submit" />
                </form> 
            </div>
        )
    }

}