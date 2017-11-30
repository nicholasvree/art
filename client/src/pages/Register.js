import React from 'react';
import API  from '../utils/API'

class Register extends React.Component {

    state = {
        name: "",
        email: "",
        password: ""
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
        
                console.log("sign up clicked")
                  event.preventDefault();
        
                  API.signUp({username: this.state.email, email:this.state.email,  password: this.state.password})
        
        
              }

    

  render() {
    return (
        <div class="register">
        <h1>Register</h1>
          <p><input value={this.state.name} type="text" name="name"  onChange={this.handleInputChange} placeholder="name"/></p>
          <p><input value={this.state.email} type="text" name="email" onChange={this.handleInputChange} placeholder="email"/></p>
          <p><input value={this.state.password} type="text" name="password" onChange={this.handleInputChange}  placeholder="password"/></p>

          <p class="submit"><input type="submit" name="commit" onClick={this.handleSubmit} value="Register"/></p>
        </div>
        
    );
  }
}

export default Register;