import React from 'react';
import { Redirect } from "react-router-dom";


class Register extends React.Component {

  render() {

    if (this.props.userEmail) {
      return <Redirect to='/gameplay' />;
    } 

    return (
        <div class="register">
        <h1>Register --- ISSUE - ENTER USERNAME AND EMAIL AS THE SAME THING</h1>
          <p><input value={this.props.registerName} type="text" name="registerName"  onChange={this.props.handleInputChange} placeholder="name"/></p>
          <p><input value={this.props.registerEmail} type="text" name="registerEmail" onChange={this.handleInputChange} placeholder="email"/></p>
          <p><input value={this.props.registerPassword} type="text" name="registerPassword" onChange={this.props.handleInputChange}  placeholder="password"/></p>

          <p class="submit"><input type="submit" name="commit" onClick={this.props.handleRegisterSubmit} value="Register"/></p>
        </div>
        
    );
  }
}

export default Register;