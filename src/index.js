import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './views/Login';
import Registration from './views/Registration';
import Navigation from './components/navigation'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <Router>
      <div>
      <Navigation/>
        <Route exact path="/" component={App} />
        <Route path="/Login" component={Login} />
        <Route path="/Registration" component={Registration} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
