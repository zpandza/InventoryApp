import React, { Component } from 'react';
import fire from '../config/fire';
import '../css/Login.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  signup = (e) => {
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).then((u) => { console.log(u) })
      .catch((error) => {
        console.log(error);
      })
  }
  resetPassword = (e) => {
    console.log(this.state.email);
    fire.auth().sendPasswordResetEmail(this.state.email)
      .then(function (user) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
    
  }
  render() {
    return (

      <div id="login-wrapper">
        <section className="form-simple">


          <div className="card">


            <div className="header pt-3 grey lighten-2">

              <div className="row d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
              </div>

            </div>


            <div className="card-body mx-4 mt-4">


              <div className="md-form">
                <input type="email" name="email" id="email" className="form-control" onChange={this.handleChange}/>
                <label htmlFor="email">Your email</label>
              </div>

              <div className="md-form pb-3">
                <input type="password" id="Form-pass4" className="form-control" name="password" onChange={this.handleChange}/>
                <label htmlFor="Form-pass4">Your password</label>
                <p className="font-small grey-text d-flex justify-content-end">Forgot <a onClick={this.resetPassword} href="#" className="dark-grey-text font-weight-bold ml-1"> Password?</a></p>
              </div>

              <div className="text-center mb-4">
                <button type="button" className="btn btn-danger btn-block z-depth-2" onClick={this.login}><Link to="/" style={{color: "white"}}>Log in</Link></button>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">Don't have an account? <a href="#" className="dark-grey-text font-weight-bold ml-1"><Link to="/Registration">Sign up</Link></a></p>

            </div>

          </div>

        </section>
      </div>
    );
  }
}
export default Login;