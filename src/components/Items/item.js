import React from 'react';
import {
    Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col
} from 'reactstrap'
import '../../css/Item.css';
import fire from '../../config/fire';
import { Table } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import classnames from 'classnames';
import CategoryOption from '../Categories/categoryOption';

class Item extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            scanModal: false,
            activeTab: '1',
            categories: []
        }
    }

    componentDidMount = () => {
        const categoriesRef = fire.database().ref('categories');
        categoriesRef.on('value', (snapshot) => {
            let _categories = snapshot.val();
            let newState = [];
            for (let category in _categories) {
                newState.push({
                    id: category,
                    categoryName: _categories[category].categoryName,
                    categoryDescription: _categories[category].categoryDescription
                });
            }

            this.setState({
                categories: newState
            });
        });
    }

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    toggleScanModal = () => {
        this.setState({
            scanModal: !this.state.scanModal
        });
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
                <li className="list-group-item d-flex justify-content-between align-items-center lead">Name: {this.props.name} -- Description: {this.props.description}
                    <div className="input-group-append" id="button-addon4">
                        <button className="ui primary button " onClick={this.toggleModal}>Edit</button>
                        <button className="ui red button" onClick={this.deleteButtonClicked}>Delete</button>
                        <button className="ui green button" onClick={this.toggleScanModal}>Scan</button>
                    </div>
                </li>
                {/* <Table.Row>
                    <Table.Cell>{this.props.name}</Table.Cell>
                    <Table.Cell>{this.props.description}</Table.Cell>
                    <Table.Cell><button className="btn btn-primary " onClick={this.toggleModal}>Edit</button></Table.Cell>
                    <Table.Cell>Test</Table.Cell>
                </Table.Row > */}
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
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" className="form-control" id="name" defaultValue={this.props.name}></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Description: </label>
                                    <input type="text" name="description" className="form-control" id="description" defaultValue={this.props.description}></input>
                                    <label htmlFor="category">Category</label>
                                    <select className="form-control" id="category" name="category" defaultValue={this.props.category}>
                                        {
                                            this.state.categories.map((category) => {
                                                console.log(category);
                                                return (
                                                    
                                                    <CategoryOption key={category.id} id={category.id} name={category.categoryName} description={category.categoryDescription}/>
                                                );
                                            })

                                        }
                                    </select>
                                    <label htmlFor="barcode">Barcode: </label>
                                    <input type="text" name="barcode" className="form-control" id="barcode" defaultValue={this.props.barcode}></input>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Edit" onClick={this.toggleModal}></input>
                        </form>

                    </ModalBody>
                </Modal>
                {/* CLOSING MODAL */}
                <Modal isOpen={this.state.scanModal}>
                    <ModalHeader toggle={this.toggleScanModal}>
                        <div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                        QR Code
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}>
                                        Barcode
                                </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </ModalHeader>
                    <ModalBody>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <div id="qrcode">
                                            <QRCode value={`Name of product: ${this.props.name} Description: ${this.props.description}`} />
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <div id="barcode">
                                        <Barcode value={this.props.barcode} style={{display: "inline-block"}} />
                                    </div>
                                </Row>
                            </TabPane>
                        </TabContent>


                        {/* <div>
                            <QRCode style={{ marginLeft: "30%" }} value={`Name of product: ${this.props.name} Description: ${this.props.description}`} />
                        </div>
                        <div>
                            <Barcode value={this.props.barcode} />
                        </div> */}
                    </ModalBody>
                </Modal>
            </div>

        );
    }
}

export default Item;