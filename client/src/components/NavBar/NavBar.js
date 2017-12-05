import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";


// Depending on the current path, this component sets the "active" class on the appropriate navigation link item


class NavBar extends React.Component {
  
    render() {



      let logParts 
      if(this.props.userEmail){  
          logParts=(
            <ul className="nav navbar-nav pull-right" >
              <li className={window.location.pathname === "/statistics" ? "active" : ""}>
              <Link to="/login" onClick = {this.props.handleLogoutSubmit}>Logout</Link>
            </li>
            </ul>)
}
        else{
          logParts=(
          <ul className="nav navbar-nav pull-right" >

          <li className={window.location.pathname === "/login" ? "active" : ""}>
            <Link to="/login">Login</Link>
          </li>
          <li className={window.location.pathname === "/register" ? "active" : ""}>
            <Link to="/register">Register</Link>
          </li>
          </ul>)
      }

      console.log(logParts)
      

  
      return (

  <nav className="navbar navbar-inverse" >
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" Link onClick={this.forceUpdate} to={'/gameplay'} >
          ArtHunt
        </Link>
      </div>
      <ul className="nav navbar-nav">
      </ul>
        {logParts}
    </div>
    <div className="container-fluid">
      
    </div>
  </nav>)}}

export default NavBar;
