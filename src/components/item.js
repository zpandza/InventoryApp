import React from 'react';
import './Item.css';
import fire from '../config/fire';

class Item extends React.Component {

    constructor(props) {
        super(props);

    }

    editButtonClicked = (e) => {



        console.log(`Name: ${this.props.name} \n
        Description: ${this.props.description}\n
        Category: ${this.props.category}\n
        Barcode: ${this.props.barcode}`);
    }

    deleteButtonClicked = (e) => {
        console.log(`delete ${this.props.name}`);
        let promise = fire.database().ref('items/' + this.props.id).remove();
        console.log(promise);

    }

    render() {
        return (
            <div id="wrapper">

                <li className="list-group-item d-flex justify-content-between align-items-center">Name: {this.props.name} -- Description: {this.props.description}
                    <div className="input-group-append" id="button-addon4">
                        <button className="btn btn-primary " onClick={this.editButtonClicked}>Edit</button>
                        <button className="btn btn-danger" onClick={this.deleteButtonClicked}>Delete</button>
                    </div>
                </li>
            </div>
        );
    }
}

export default Item;