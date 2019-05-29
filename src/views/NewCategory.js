import React from 'react';
import fire from '../config/fire';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class NewCategory extends React.Component {


    addNewCategory = (e) => {

        e.preventDefault();

        //let id = e.target.elements.id.value;
        let categoryName = e.target.elements.categoryName.value;
        let categoryDescription = e.target.elements.categoryDescription.value;

        
        this.writeUserData(categoryName,categoryDescription);

    }

    writeUserData = (categoryName, categoryDescription) => {
        let postRef = fire.database().ref('categories');

        let newPostRef = postRef.push()

        newPostRef.set({
            categoryName: categoryName,
            categoryDescription: categoryDescription
        })

        // fire.database().ref('categories/' + id).set({
        //     categoryName: categoryName,
        //     categoryDescription: categoryDescription
        // });

    }

    render(){
        return(
        <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6">
                        <h2>Register new user:</h2><br />
                        <form className="align-center" onSubmit={this.addNewCategory}>
                            <div className="form-group">
                                <div className="form-row">
                                    {/* <label htmlFor="id">ID: </label>
                                    <input type="text" name="id" className="form-control" id="id"></input> */}
                                    <label htmlFor="name">Category Name: </label>
                                    <input type="text" name="categoryName" className="form-control" id="categoryName"></input>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="description">Category Description: </label>
                                    <input type="text" name="categoryDescription" className="form-control" id="categoryDescription"></input>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Add"></input>
                        </form>

                        <div className="col-3">

                        </div>
                    </div>
                </div>
        );
    }


}

export default NewCategory;