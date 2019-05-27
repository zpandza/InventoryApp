import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import './Item.css';
import fire from '../config/fire';
import { Table } from 'semantic-ui-react';

class Item extends React.Component {

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
        let name = e.target.elements.name.value;
        let description = e.target.elements.description.value;
        let category = e.target.elements.category.value;
        let barcode = e.target.elements.barcode.value;


        this.writeNewPost(id, name, description, category, barcode);

        console.log(`Name: ${this.props.name} \n
        Description: ${this.props.description}\n
        Category: ${this.props.category}\n
        Barcode: ${this.props.barcode}`);
    }

    writeNewPost = (id, name, description, category, barcode) => {
        // A post entry.
        var postData = {
            name: name,
            description: description,
            category: category,
            barcode: barcode,
        };

        // Get a key for a new Post.
        var newPostKey = fire.database().ref().child('items').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/items/' + id] = postData;

        return fire.database().ref().update(updates);
    }


    deleteButtonClicked = (e) => {
        console.log(`delete ${this.props.name}`);
        let promise = fire.database().ref('items/' + this.props.id).remove();
        console.log(promise);

    }

    render() {
        return (
            <div id="">

            {/* <li className="list-group-item d-flex justify-content-between align-items-center">Name: {this.props.name} -- Description: {this.props.description}
                <div className="input-group-append" id="button-addon4">
                    <button className="btn btn-primary " onClick={this.toggleModal}>Edit</button>
                    <button className="btn btn-danger" onClick={this.deleteButtonClicked}>Delete</button>

                </div>
            </li> */}
            <Table.Row>
                <Table.Cell>{this.props.name}</Table.Cell>
                <Table.Cell>{this.props.description}</Table.Cell>
                <Table.Cell>Test</Table.Cell>
                <Table.Cell>Test</Table.Cell>
            </Table.Row >
            {/* MODAL FOR EDITING */ }
        {/* <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Edit item {this.props.name}:
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.editButtonClicked} className="align-center">
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" className="form-control" id="id" value={this.props.id} readOnly></input>
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" className="form-control" id="name" defaultValue={this.props.name}></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Description: </label>
                                    <input type="text" name="description" className="form-control" id="description" defaultValue={this.props.description}></input>
                                    <label htmlFor="category">Category: </label>
                                    <input type="text" name="category" className="form-control" id="category" defaultValue={this.props.category}></input>
                                    <label htmlFor="barcode">Barcode: </label>
                                    <input type="text" name="barcode" className="form-control" id="barcode" defaultValue={this.props.barcode}></input>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Edit" onClick={this.toggleModal}></input>
                        </form>
                    </ModalBody>
                </Modal>
                CLOSING MODAL */}
        </div>

        );
    }
}

export default Item;