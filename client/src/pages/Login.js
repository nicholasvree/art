import React from 'react';
import { Redirect } from "react-router-dom";


class Login extends React.Component {

  render() {
    //if logged in, go to GAMEPLAY page
    if (this.props.userEmail) {
      return <Redirect to='/gameplay' />;
    } 

    return (
        <div className="login">
        <h1>Login to Web App</h1>
          <p><input type="text" name="loginEmail" value={this.props.loginEmail} onChange={this.props.handleInputChange} placeholder="Email"/></p>
          <p><input type="password" name="loginPassword" value={this.props.loginPassword} onChange={this.props.handleInputChange} placeholder="Password"/></p>
          <p className="submit"><input type="submit" name="commit" value="Login" onClick={this.props.handleLoginSubmit}/></p>
        </div>
        
    );
  }
}
export default Login;