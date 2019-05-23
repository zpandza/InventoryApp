import React, { Component } from 'react';
import fire from '../config/fire';
import Item from '../components/item';
import Firebase from 'firebase';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsRef: fire.database().ref("items"),
            name: "",
            description: "",
            category: "",
            barcode: ""
        }
        let items = fire.database().ref('items');
        items.on('value', snapshot => {
            snapshot.forEach((item)=>{
                console.log(item.toJSON());
            })
        });
         
        this.logout = this.logout.bind(this);
    }
    getData = (values) => {
        //console.log(values);
    }


    logout() {
        fire.auth().signOut();
    }

    // getUserData = () => {

    //     let something = fire;

    //     let database = something.database();

    //     let ref = database.ref('items');

    //     ref.on('value', this.gotData, this.errData);

    // }

    // gotData = (data) => {
    //     console.log('data retrieved')
    //     console.log(data.val());
    // }

    // errData = (err) => {
    //     console.log(err);
    //     console.log('error');
    // }

    // componentDidMount() {
    //     this.getUserData();
    // }

    addItem = (e) => {
        e.preventDefault();

        let id = e.target.elements.id.value;
        let name = e.target.elements.name.value;
        let description = e.target.elements.description.value;
        let category = e.target.elements.category.value;
        let barcode = e.target.elements.barcode.value;

        this.writeUserData(id, name, description, category, barcode)

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
                <form onSubmit={this.addItem}>
                    <input type="text" name="id"></input>
                    <input type="text" name="name"></input>
                    <input type="text" name="description"></input>
                    <input type="text" name="category"></input>
                    <input type="text" name="barcode"></input>
                    <input type="submit" value="Add"></input>
                </form>
                <Item name={`some name`} description={`some description`} category={`some category`} barcode={`some barcode`} itemsRef={this.state.itemsRef.toJSON()}/>
                <h1>Welcome to Home page !!</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );

    }

}

export default Home;