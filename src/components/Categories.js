import React from 'react';
import CategoryItem from './Categories/category';
import fire from '../config/fire';
import Login from '../components/Login';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import '../css/Categories.css';

class Categories extends React.Component {

    _isMounted = false;

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            //console.log(user);
            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }


    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            user: null
        }
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.authListener();

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
    componentWillUnmount(){
        this._isMounted = false;
    }


    render() {
        return (

            <div>
                {
                    this.state.user ?
                        <div>
                            <div id="wrapDiv"><br />
                                <h1 className="text-center">Categories:</h1>
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

                                }<br />

                                <div id="addCategoryNameButton">
                                    <button className="ui primary button"><Link style={{ color: "white" }} to="/NewCategory">Add Category</Link></button>
                                </div>
                            </div>
                        </div> : <Login />
                }

            </div>
        );
    }
}

export default Categories;