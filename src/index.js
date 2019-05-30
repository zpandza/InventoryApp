import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './components/Login';
import Items from './components/Items';
import Registration from './components/Registration';
import Navigation from './components/navigation';
import NewItem from './components/Items/newItem';
import UserList from './components/UserList';
import Categories from './components/Categories';
import NewCategory from './components/Categories/NewCategory';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "semantic-ui-css/semantic.min.css";

const routing = (
    <Router>
      <div>
      <Navigation/>
        <Route exact path="/" component={App} />
        <Route path="/Items" component={Items}/>
        <Route path="/Login" component={Login} />
        <Route path="/Registration" component={Registration} />
        <Route path="/NewItem" component={NewItem}/>
        <Route path="/Users" component={UserList}/>
        <Route path="/Categories" component={Categories}/>
        <Route path="/NewCategory" component={NewCategory}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
