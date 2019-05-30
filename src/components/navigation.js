import React from 'react';
import fire from '../config/fire';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Navigation extends React.Component {
    logout = () => {
        fire.auth().signOut();
    }

    constructor() {
        super();
        this.state = ({
            user: null,
        });
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

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

    render() {
        return (
            <div>
                {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link"><Link to="/">Home</Link> <span className="sr-only">(current)</span></a>
                                <a className="nav-link"><Link to="/Users">Users</Link></a>
                                <a className="nav-link"><Link to="/Categories">Categories</Link></a>
                            </li>
                        </ul>
                    </div>
                </nav> */}

                {
                    (this.state.user && fire.auth().currentUser.emailVerified) &&
                    <div className="ui menu">
                        <Link className="item" to="/">Home</Link>
                        <Link className="item" to="/Items">Items</Link> 
                        <Link className="item" to="/Users">Users</Link> 
                        <Link className="item" to="/Categories">Categories</Link>
                        <Link className="item" onClick={this.logout} to="/Login">Log Out</Link>
                    </div>
                }


            </div>
        );
    }

}

export default Navigation;