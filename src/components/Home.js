import React, { Component } from 'react';
import fire from '../config/fire';
import Item from './Items/item';
import CategoryOption from './Categories/categoryOption';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Button, ItemDescription, Table, Menu, Icon } from 'semantic-ui-react'
import Firebase from 'firebase';
import '../css/Home.css';
import users from '../images/users.png';
import items from '../images/items.png';
import category from '../images/category.png'

class Home extends Component {

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
            selectValue: ""
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount = () => {
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
                    barcode: _items[item].barcode
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
        //console.log(selectValue);
        if (selectValue !== "") {
            //console.log("mijenjaj");
            currentList = this.state.items;

            newList = currentList.filter((item) => {
                const lowerCase = item.category.toLowerCase();
                //console.log(lowerCase);
                const filter = selectValue.toLowerCase();

                console.log(lowerCase.includes(filter));

                return lowerCase.includes(filter);
            })


        } else {
            console.log("ne mijenjaj");
            newList = this.state.items;
        }
        console.log(newList);
        this.setState({
            filteredItems: newList,
            selectValue: selectValue
        });
    }

    render() {

        return (



            <div>
                {
                    fire.auth().currentUser.emailVerified ?
                        <div className="container" id="container">
                            <div className="row">
                                <div className="col-4">
                                    <div className="card" style={{ width: "25rem", borderRadius: "25px" }}>
                                        <div className="card-image-container">
                                            <img className="card-img-top card-image" src={items} alt="Card image cap" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Items</h5>
                                            <p className="card-text">Browse through our Inventory.</p>
                                            <Link className="btn btn-primary" to="/Items" style={{ color: "white" }}>Go to Items</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card" style={{ width: "25rem", borderRadius: "25px" }}>
                                        <div className="card-image-container">
                                            <img className="card-img-top card-image" src={users} alt="Card image cap"/>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Users</h5>
                                            <p className="card-text">See all users who are using our application.</p>
                                            <Link className="btn btn-primary" to="/Users" style={{ color: "white" }}>Go to Users</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card" style={{ width: "25rem", borderRadius: "25px" }}>
                                        <div className="card-image-container">
                                            <img className="card-img-top card-image" src={category} alt="Card image cap"/>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Categories</h5>
                                            <p className="card-text">See all categories that we are sorting items to.</p>
                                            <Link className="btn btn-primary" to="/Categories" style={{ color: "white" }}>Go to Categories</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        <div id="verificationDiv">
                            <h1>Please verify your email so we can be sure you are authentic.</h1><br />
                            <p>To get verification email, please click button bellow.</p><br />
                            <button className="ui button primary" onClick={this.sendVerification}>Send verificiation</button>
                        </div>
                }



            </div>
        );
    }

}

export default Home;