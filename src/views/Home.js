import React, { Component } from 'react';
import fire from '../config/fire';
import Item from '../components/item';
import Firebase from 'firebase';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsRef: fire.database().ref("items"),
            items: [],
            name: "",
            description: "",
            category: "",
            barcode: ""
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount = () => {
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

            this.setState({
                items: newState
            });
        });
    }

    logout() {
        fire.auth().signOut();
    }

    addItem = (e) => {
        e.preventDefault();

        let id = e.target.elements.id.value;
        let name = e.target.elements.name.value;
        let description = e.target.elements.description.value;
        let category = e.target.elements.category.value;
        let barcode = e.target.elements.barcode.value;

        

        this.writeUserData(id, name, description, category, barcode)

        e.target.elements.id.value = '';
        e.target.elements.name.value = '';
        e.target.elements.description.value = '';
        e.target.elements.category.value = '';
        e.target.elements.barcode.value  = '';
    }

    writeUserData = (id, name, description, category, barcode) => {
        fire.database().ref('items/' + id).set({
            name: name,
            description: description,
            category: category,
            barcode: barcode
        });

    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6">
                        <form onSubmit={this.addItem} className="align-center">
                            <div className="form-group">
                                <div className="form-row">
                                    <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" id="id"></input>
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" id="name"></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Description: </label>
                                    <input type="text" name="description" id="description"></input>
                                    <label htmlFor="category">Category: </label>
                                    <input type="text" name="category" id="category"></input>
                                    <label htmlFor="barcode">Barcode: </label>
                                    <input type="text" name="barcode" id="barcode"></input>
                                </div>
                            </div>
                            <input type="submit" value="Add"></input>
                        </form>
                    </div>
                    <div className="col-3">

                    </div>
                </div>
                <div>

                    {console.log(this.state.items)}
                    <div>
                        <h1>Items: </h1>
                        {
                            this.state.items.map((item) => {
                                return (
                                    <div>
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

                    
                    <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        );

    }

}

export default Home;