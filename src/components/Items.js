import React, { Component } from 'react';
import fire from '../config/fire';
import Item from './Items/item';
import CategoryOption from './Categories/categoryOption';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Button, ItemDescription, Table, Menu, Icon } from 'semantic-ui-react'
import Firebase from 'firebase';
import '../css/Home.css';

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
                    fire.auth().currentUser.emailVerified ? <div>
                        <div><br />
                            <div id="aboveListDiv">
                                <h1>Items: </h1><br />
                                <button className="ui primary button"><Link to="/NewItem" style={{ color: "white" }}>Add Item</Link></button><br /><br />
                            </div>
                            <div id="sortingDiv">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="searchbar">Search:</label>
                                        <input type="text" id="searchbar" name="search" className="form-control" style={{ width: "200px", alignContent: "center" }} onChange={this.handleChange} placeholder="Search..." />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="categorySelect">Categories:</label>
                                        <select className="form-control" id="categorySelect" name="categorySelect" style={{ width: "200px" }} onChange={this.handleChangeCategory}>
                                            <option></option>
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
                            </div><br />
                            {

                                (this.state.searchValue == "" && this.state.selectValue == "") ? this.state.items.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <div>

                                                <div className="container">
                                                    <ul className="list-group">
                                                        <Item id={item.id} name={item.name} description={item.description} category={item.category} barcode={item.barcode} />
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                    :
                                    this.state.filteredItems.map((item) => {
                                        return (
                                            <div key={item.id}>
                                                <div>

                                                    <div className="container">
                                                        <ul className="list-group">
                                                            <Item id={item.id} name={item.name} description={item.description} category={item.category} barcode={item.barcode} />
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                            }

                        </div>

                        {/* <button onClick={this.logout} className="ui red button">Logout</button> */}
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

export default Items;