import React from 'react';
import fire from '../../config/fire';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import CategoryOption from '../Categories/categoryOption';

class NewItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

    addItem = (e) => {
        e.preventDefault();

        //let id = e.target.elements.id.value;
        let name = e.target.elements.name.value;
        let description = e.target.elements.description.value;
        let category = e.target.elements.category.value;
        let barcode = e.target.elements.barcode.value;



        this.writeUserData(name, description, category, barcode)

        //e.target.elements.id.value = '';
        e.target.elements.name.value = '';
        e.target.elements.description.value = '';
        e.target.elements.category.value = '';
        e.target.elements.barcode.value = '';
    }

    writeUserData = (name, description, category, barcode) => {

        let postRef = fire.database().ref('items');

        let newPostRef = postRef.push();

        newPostRef.set({
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
                        <h2>Add new item:</h2><br />
                        <form onSubmit={this.addItem} className="align-center">
                            <div className="form-group">
                                <div className="form-row">
                                    {/* <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" className="form-control" id="id"></input> */}
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" name="name" className="form-control" id="name"></input>
                                    
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Description: </label>
                                    <input type="text" name="description" className="form-control" id="description"></input>
                                    <label htmlFor="category">Category</label>
                                    <select className="form-control" id="category" name="category">
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
                                    <input type="text" name="barcode" className="form-control" id="barcode"></input>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Add"></input><br /><br />
                            <button className="btn btn-primary"><Link to="/Items" style={{ color: "white" }}>Back</Link></button>
                        </form>

                        <div className="col-3">

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default NewItem;