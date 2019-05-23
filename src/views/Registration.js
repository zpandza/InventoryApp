import React from 'react';

class Registration extends React.Component {
    submitRegistration(e) {
        e.preventDefault();

        console.log("registration");

        let firstName = e.target.elements.firstName.value;
        let lastName = e.target.elements.lastName.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;
        let repeatPassword = e.target.elements.repeatPassword.value;

        console.log(`First name: ${firstName} \n
        Last name: ${lastName} \n
        Email: ${email} \n
        Password: ${password} \n
        Repeated Password: ${repeatPassword}`);
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.submitRegistration}>
                    <input type="text" placeholder="First name" name="firstName"></input><br/>
                    <input type="text" placeholder="Last name" name="lastName"></input><br/>
                    <input type="email" placeholder="Email" name="email"></input><br/>
                    <input type="password" placeholder="Password" name="password"></input><br/>
                    <input type="password" placeholder="Repeat Password" name="repeatPassword"></input><br/>
                    <input type="submit" value="Register"></input><br/>
                </form>
            </div>
        );
    }
}

export default Registration;