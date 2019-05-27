import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                </nav>
            </div>
        );
    }

}

export default Navigation;