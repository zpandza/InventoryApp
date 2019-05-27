import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import './Item.css';
import fire from '../config/fire';

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,

        }
    }

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    editButtonClicked = (e) => {

        e.preventDefault();

        let id = e.target.elements.id.value;
        let firstname = e.target.elements.firstname.value;
        let lastname = e.target.elements.lastname.value;
        let dob = e.target.elements.dob.value;
        let email = e.target.elements.email.value;


        this.writeNewPost(id,firstname,lastname,dob,email);

        console.log(`Name: ${this.props.name} \n
        Description: ${this.props.description}\n
        Category: ${this.props.category}\n
        Barcode: ${this.props.barcode}`);
    }
    writeNewPost = (id, firstname, lastname, dob, email) => {
        // A post entry.
        var postData = {
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            email: email,
        };
    
        // Get a key for a new Post.
        var newPostKey = fire.database().ref().child('users').push().key;
    
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/users/' + id] = postData;
    
        return fire.database().ref().update(updates);
    }
    

    deleteUser = () => {
        let promise = fire.database().ref('users/' + this.props.id).remove();
    }

    render() {
        return (
            <div id="wrapper">

                <li className="list-group-item d-flex justify-content-between align-items-center">Firstname: {this.props.firstname} Lastname: {this.props.lastname}
                    <div className="input-group-append" id="button-addon4">
                        <button className="btn btn-primary" onClick={this.toggleModal}>Edit</button>
                        <button className="btn btn-danger" onClick={this.deleteUser}>Delete</button>

                    </div>
                </li>
                {/* MODAL FOR EDITING */}
                <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Edit item {this.props.name}:
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.editButtonClicked} className="align-center">
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" className="form-control" id="id" value={this.props.id} readOnly></input>
                                    <label htmlFor="name">Firstname: </label>
                                    <input type="text" name="firstname" className="form-control" id="firstname" defaultValue={this.props.firstname}></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Lastname: </label>
                                    <input type="text" name="lastname" className="form-control" id="lastname" defaultValue={this.props.lastname}></input>
                                    <label htmlFor="category">DOB: </label>
                                    <input type="date" name="dob" className="form-control" id="dob" defaultValue={this.props.dob}></input>
                                    <label htmlFor="barcode">Email: </label>
                                    <input type="text" name="email" className="form-control" id="email" defaultValue={this.props.email}></input>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Edit" onClick={this.toggleModal}></input>
                        </form>
                    </ModalBody>
                </Modal>
                {/* CLOSING MODAL */}
            </div>
        );
    }
}

export default User;