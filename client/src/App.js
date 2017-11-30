import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
    userEmail:"bb",
    userId: ""
  }

  componentDidMount(){
    API.getCurrentUserId().
    then(res => this.setState({userEmail: res.data.email, userId: res.data._id}))
    .catch(err =>console.log(err))        
  }

  render() {

    console.log(this.state)
    return (
    <Router>
      <div className="container">
        <NavBar userEmail= {this.state.userEmail} />
        <Wrapper>
          <Route exact path="/gameplay" component={GamePlay} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

        </Wrapper>
        <Footer />
      </div>
    </Router>
    );
  }
}

export default App;
