import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import GamePlay from './pages/GamePlay'
import Wrapper from './components/Wrapper/Wrapper'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import Statistics from './pages/Statistics'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import API from "./utils/API";

class App extends Component {

  state = {
    //////LOGIN////////
    loginEmail:"",
    loginPassword:"",
    /////REGISTRATION/////////
    registerName: null,
    registerEmail:null,
    registerPassword:null,
    /////AUTH STATUS GENERAl///////
    userEmail:null,
    userId: null,
  }
  
////////////////////SHARED////////////////////////////

  componentDidMount(){ 
       this.checkLoggedInStatus()
    }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  checkLoggedInStatus = () => {
    API.getCurrentUserId().
    then(res => this.setState({userEmail: res.data.email, userId: res.data._id}))
    .catch(err => this.setState({userEmail: null, userId: null}) )  
  }

//////////////////REGISTRATION///////////////////////////////
  handleRegisterSubmit = event => {
    event.preventDefault();
    API.signUp({username: this.state.registerName, email:this.state.registerEmail,  password: this.state.registerPassword})
    .then(res => {this.setState({userEmail: res.data.email, userId: res.data._id})})
  }

///////////////LOGIN///////////////////////////////////////
  handleLoginSubmit = event => {
    console.log("clicked")
    event.preventDefault();

    API.login({username: this.state.loginEmail, password: this.state.loginPassword})
    .then( res => {this.setState({userEmail : res.data.email, userId: res.data._id})
    console.log(this.state)})
  }

  handleLogoutSubmit = event => {
    API.logout()
    .then(res => {this.setState({userEmail : res.data.email, userId: res.data._id})
    console.log("LOGOUT FUNCTION", this.state)})
  }


  render() {

    console.log(this.state)
    return (
    <Router>
      <div className="container">
        <NavBar userEmail= {this.state.userEmail} handleLogoutSubmit = {this.handleLogoutSubmit} />
        <Wrapper>
          <Route exact path="/gameplay" render={ props => <GamePlay userEmail={this.state.userEmail}/> }/>
          <Route exact path="/statistics" render={ props => <Statistics userEmail={this.state.userEmail}/> }/>
          <Route exact path="/login" render={ props => <Login handleInputChange = {this.handleInputChange} handleLoginSubmit = {this.handleLoginSubmit} userEmail={this.state.userEmail}/> } />
          <Route exact path="/register" render={ props => <Register handleInputChange = {this.handleInputChange} handleRegisterSubmit = {this.handleRegisterSubmit} userEmail={this.state.userEmail}/> }/>
        </Wrapper>
        <Footer />
      </div>
    </Router>
    );
  }
}

export default App;
