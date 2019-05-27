import React from 'react';
import fire from '../config/fire';

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    signUpClicked = (e) => {
        e.preventDefault();


        let id = e.target.elements.id.value;
        let firstname = e.target.elements.firstname.value;
        let lastname = e.target.elements.lastname.value;
        let dob = e.target.elements.DOB.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;


        this.insertUser(id, firstname, lastname, dob, email, password);
        this.signup();
    }

    insertUser = (id, firstname, lastname, dob, email) => {
        fire.database().ref('users/' + id).set({
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            email: email
        });
    }

    signup = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch((error) => {
                console.log(error);
            })

        let id = e.target.elements.id.value;
        let firstname = e.target.elements.firstname.value;
        let lastname = e.target.elements.lastname.value;
        let dob = e.target.elements.DOB.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

        this.insertUser(id, firstname, lastname, dob, email, password);
    }

    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6">
                        <h2>Register new user:</h2><br />
                        <form className="align-center" onSubmit={this.signup}>
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" className="form-control" id="id"></input>
                                    <label htmlFor="name">First name: </label>
                                    <input type="text" name="firstname" className="form-control" id="firstname"></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Last name: </label>
                                    <input type="text" name="lastname" className="form-control" id="lastname"></input>
                                    <label htmlFor="category">DOB: </label>
                                    <input type="date" name="DOB" className="form-control" id="DOB"></input>
                                    <label htmlFor="barcode">Email: </label>
                                    <input type="text" name="email" className="form-control" id="email" onChange={this.handleChange}></input>
                                    <label htmlFor="barcode">Password: </label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Add"></input>
                        </form>

                        <div className="col-3">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;