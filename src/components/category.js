import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import './Item.css';
import fire from '../config/fire';

class CategoryItem extends React.Component {

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
        let categoryName = e.target.elements.categoryName.value;
        let categoryDescription = e.target.elements.categoryDescription.value;



        this.writeNewPost(id, categoryName, categoryDescription);
    }
    writeNewPost = (id, categoryName, categoryDescription) => {
        // A post entry.
        var postData = {
            categoryName: categoryName,
            categoryDescription: categoryDescription
        };
        // Get a key for a new Post.
        var newPostKey = fire.database().ref().child('categories').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/categories/' + id] = postData;

        return fire.database().ref().update(updates);
    }

    deleteCategory = () => {
        let promise = fire.database().ref('users/' + this.props.id).remove();
        console.log(promise);
    }

    render() {
        return (
            <div>
                <li className="list-group-item d-flex justify-content-between align-items-center">ID: {this.props.id} Name: {this.props.categoryName} -- Description: {this.props.categoryDescription}
                    <div className="input-group-append" id="button-addon4">
                        <button className="btn btn-primary " onClick={this.toggleModal}>Edit</button>
                        <button className="btn btn-danger" onClick={this.deleteCategory}>Delete</button>

                    </div>
                </li>
                {/* MODAL FOR EDITING */}
                <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Edit item {this.props.categoryName}:
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.editButtonClicked} className="align-center">
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" className="form-control" id="id" value={this.props.id} readOnly></input>
                                    <label htmlFor="name">Category Name: </label>
                                    <input type="text" name="categoryName" className="form-control" id="categoryName" defaultValue={this.props.categoryName}></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Category Description: </label>
                                    <input type="text" name="categoryDescription" className="form-control" id="categoryDescription" defaultValue={this.props.categoryDescription}></input>
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

export default CategoryItem;