import React, { Component } from 'react';
import fire from '../config/fire';
import Item from './Items/item';
import Navigation from './navigation';
import CategoryOption from './Categories/categoryOption';
import Login from './Login';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import '../css/Home.css';
import logo from '../images/spark-bijeli.png';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import ReactTable from 'react-table'
import selectTableHOC from "react-table/lib/hoc/selectTable";
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import classnames from 'classnames';

import {
    Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col
} from 'reactstrap'

import 'react-table/react-table.css'


const SelectTable = selectTableHOC(ReactTable)

class Items extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            itemsRef: fire.database().ref("items"),
            items: [],
            filteredItems: [],
            categories: [],
            name: "",
            description: "",
            category: "",
            barcode: "",
            userVerified: "false",
            searchValue: "",
            selectValue: "",
            user: null,
            modalIsOpen: false,


            //Scan modal
            scanModal: false,
            activeTab: '1',
        }

        this.logout = this.logout.bind(this);
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {

            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }

        });
    }

    componentDidMount = () => {
        this.authListener();

        this._isMounted = true;
        const itemsRef = fire.database().ref('items');

        itemsRef.on('value', (snapshot) => {
            let _items = snapshot.val();
            let newState = [];
            for (let item in _items) {
                newState.push({
                    id: item,
                    name: _items[item].name,
                    description: _items[item].description,
                    category: _items[item].category,
                    barcode: _items[item].barcode,
                });
            }

            if (this._isMounted) {
                this.setState({
                    items: newState
                });
            }
        });

        this.getCategories();

    }

    getCategories = () => {
        this._isMounted = true;
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

            if (this._isMounted) {
                this.setState({
                    categories: newState
                });
            }

        });
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    logout() {
        fire.auth().signOut();
    }


    sendVerification = () => {
        var user = fire.auth().currentUser;

        user.sendEmailVerification().then(function () {
            console.log("verification sent");
        }).catch(function (error) {
            console.log(error + " occured");
        });

    }

    isSelected = (that) => {
        console.log(that);
    }

    toggleSelection = (key, shift, row) => {
        console.log("togle selection ==================================")
        console.log(key)
        console.log(shift)
        console.log(row)
        console.log("togle selection ==================================")


        this.setState({
            id: row.id,
            name: row.name,
            description: row.description,
            category: row.category,
            barcode: row.barcode,
        });

    };

    handleChange = () => {
        let currentList = [];
        let newList = [];
        let searchValue = document.getElementById('searchbar').value;

        if (searchValue !== "") {
            currentList = this.state.items;
            newList = currentList.filter((item) => {
                const lowerCase = item.name.toLowerCase();
                const filter = searchValue.toLowerCase();
                return lowerCase.includes(filter);
            })
        } else {
            newList = this.state.items;
        }

        this.setState({
            filteredItems: newList,
            searchValue: searchValue
        });
    }

    handleChangeCategory = () => {
        let currentList = [];
        let newList = [];
        let selectValue = document.getElementById('categorySelect').value;

        if (selectValue !== "") {
            currentList = this.state.items;
            newList = currentList.filter((item) => {
                const lowerCase = item.category.toLowerCase();
                const filter = selectValue.toLowerCase();
                return lowerCase.includes(filter);
            })
        } else {
            newList = this.state.items;
        }

        this.setState({
            filteredItems: newList,
            selectValue: selectValue
        });
    }

    //TEMP
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

    //TEMP
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


    //TEMP
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

    deleteButtonClicked = (e) => {
        console.log(`delete ${this.state.name}`);
        let promise = fire.database().ref('items/' + this.state.id).remove();
        console.log(promise);

    }

    render() {

        const columns = [
            {
                Header: 'Name',
                accessor: 'name' // String-based value accessors!
            },
            {
                Header: 'Description',
                accessor: 'description' // String-based value accessors!
            },
            {
                Header: 'Category',
                accessor: 'category' // String-based value accessors!
            },
            {
                Header: 'Barcode',
                accessor: 'barcode'
            }]

        const { toggleSelection, toggleAll, isSelected } = this;

        const checkboxProps = {
            isSelected,
            toggleSelection,
            toggleAll,
            selectType: "checkbox",
        };

        return (
            <div className="items-container">
                {
                    this.state.user ? <div>
                        <Navigation />
                        <div className="row">
                            <div className="col-2">

                            </div>
                            <div className="col-10">

                                <div><br />
                                    <div id="aboveListDiv">
                                        <h1>Items: </h1><br />
                                        <img src={logo}></img>
                                    </div><br /><br />
                                    <div className="row">
                                        <div className="col">
                                            <div className="search">
                                                <span className="fa fa-search"></span>
                                                <input type="text" id="searchbar" name="search" className="form-control" onChange={this.handleChange} placeholder="Search..." />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="categorySearch">
                                                <select className="form-control" id="categorySelect" name="categorySelect" placeholder="Search by category:" onChange={this.handleChangeCategory}>
                                                    <option defaultValue="" value="" selected >Select your option</option>
                                                    {

                                                        this.state.categories.map((category) => {
                                                            console.log(category);
                                                            return (

                                                                <CategoryOption key={category.id} id={category.id} name={category.categoryName} description={category.categoryDescription} />
                                                            );
                                                        })

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">

                                            <Link id="new-item-button" className="ui primary button" to="/NewItem" style={{ color: "white" }}>Add Item</Link>

                                        </div>
                                        <div className="col">

                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="row" style={{ paddingTop: "50px" }}>


                                        {
                                            (this.state.searchValue == "" && this.state.selectValue == "") ?

                                                < SelectTable
                                                    keyField="id"
                                                    data={this.state.items}
                                                    columns={columns}
                                                    defaultPageSize={5}
                                                    ref="selecttable"
                                                    style={{
                                                        width: "80%"
                                                    }}
                                                    {...checkboxProps}
                                                />
                                                :
                                                < SelectTable
                                                    keyField="id"
                                                    data={this.state.filteredItems}
                                                    columns={columns}
                                                    defaultPageSize={5}
                                                    ref="selecttable"
                                                    style={{
                                                        width: "80%"
                                                    }}
                                                    {...checkboxProps}
                                                />

                                        }

                                        <Modal isOpen={this.state.modalIsOpen}>
                                            <ModalHeader toggle={this.toggleModal}>
                                                Edit item {this.props.name}:
                                            </ModalHeader>
                                            <ModalBody>
                                                <form onSubmit={this.editButtonClicked} className="align-center">
                                                    <div className="form-group">
                                                        <div className="form-row">
                                                            <label htmlFor="id">ID: </label>
                                                            <input type="text" name="id" className="form-control" id="id" value={this.state.id} readOnly></input>
                                                            <label htmlFor="name">Name: </label>
                                                            <input type="text" name="name" className="form-control" id="name" defaultValue={this.state.name}></input>
                                                        </div>
                                                        <div className="form-row">
                                                            <label htmlFor="description">Description: </label>
                                                            <input type="text" name="description" className="form-control" id="description" defaultValue={this.state.description}></input>
                                                            <label htmlFor="category">Category</label>
                                                            <select className="form-control" id="category" name="category" defaultValue={this.state.category}>
                                                                {
                                                                    this.state.categories.map((category) => {
                                                                        //console.log(category);
                                                                        return (

                                                                            <CategoryOption key={category.id} id={category.id} name={category.categoryName} description={category.categoryDescription} />
                                                                        );
                                                                    })

                                                                }
                                                            </select>
                                                            <label htmlFor="barcode">Barcode: </label>
                                                            <input type="text" name="barcode" className="form-control" id="barcode" defaultValue={this.state.barcode}></input>
                                                        </div>
                                                    </div>
                                                    <input type="submit" className="btn btn-danger" value="Edit" onClick={this.toggleModal}></input>
                                                </form>

                                            </ModalBody>
                                        </Modal>

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
                                                                    <QRCode value={`Name of product: ${this.state.name} Description: ${this.state.description}`} />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <Row>
                                                            <div id="barcode">
                                                                <Barcode value={this.state.barcode} style={{ display: "inline-block" }} />
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
                                    <br></br>
                                    <div className="button-div">
                                        <button className="ui primary button" onClick={this.toggleModal}>Edit</button>
                                        <button className="ui red button" onClick={this.deleteButtonClicked}>Delete</button>
                                        <button className="ui green button" onClick={this.toggleScanModal}>Scan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        :
                        <Login />
                }
            </div>
        );
    }

}

export default Items;