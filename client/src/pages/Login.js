import API  from '../utils/API'

import React from 'react';

class Login extends React.Component {

    state={
        email:"",
        password:""
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
    
        // Updating the input's state
        this.setState({
          [name]: value
        });

      };

      handleSubmit = event => {

        console.log("clicked")
          event.preventDefault();

          API.login({username: this.state.email, password: this.state.password})


      }

  render() {
    return (
        <div className="login">
        <h1>Login to Web App</h1>
          <p><input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/></p>
          <p><input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password"/></p>
          <p className="submit"><input type="submit" name="commit" value="Login" onClick={this.handleSubmit}/></p>
        </div>
        
    );
  }
}

export default Login;