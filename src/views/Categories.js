import React from 'react';
import CategoryItem from '../components/category';
import fire from '../config/fire';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class Categories extends React.Component {

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



    render() {
        return (
            <div>
                <div>
                    <div><br />
                        <h1>Categories:</h1>
                        {
                            this.state.categories.map((category) => {
                                return (
                                    <div key={category.id}>
                                        <div>
                                            <div className="container">
                                                <ul className="list-group">
                                                    <CategoryItem id={category.id} categoryName={category.categoryName} categoryDescription={category.categoryDescription} />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })

                        }
                        <button className="btn btn-primary"><Link style={{ color: "white" }} to="/NewCategory">Add Category</Link></button>
                    </div><br />

                </div>
            </div>
        );
    }
}

export default Categories;