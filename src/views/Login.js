import React, { Component } from 'react';
import fire from '../config/fire';
import './Login.css';

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
                <p className="font-small grey-text d-flex justify-content-end">Forgot <a href="#" className="dark-grey-text font-weight-bold ml-1"> Password?</a></p>
              </div>

              <div className="text-center mb-4">
                <button type="button" className="btn btn-danger btn-block z-depth-2" onClick={this.login}>Log in</button>
              </div>
              <p className="font-small grey-text d-flex justify-content-center">Don't have an account? <a href="#" className="dark-grey-text font-weight-bold ml-1"> Sign up</a></p>

            </div>

          </div>

        </section>
      </div>
    );
  }
}
export default Login;