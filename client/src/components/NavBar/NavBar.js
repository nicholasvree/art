import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";


// Depending on the current path, this component sets the "active" class on the appropriate navigation link item


class NavBar extends React.Component {
  
    render() {
  
      return (

  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          ArtHunt
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li
          className={window.location.pathname === "/gameplay" ? "active" : ""}
        >
          <Link to="/gameplay">Game Play</Link>
        </li>
        <li className={window.location.pathname === "/statistics" ? "active" : ""}>
          <Link to="/search">Statistics</Link>
        </li>
        <li className={window.location.pathname === "/login" ? "active" : ""}>
          <Link to="/login">Login</Link>
        </li>
        <li className={window.location.pathname === "/register" ? "active" : ""}>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      {this.props.userEmail}
      <button onClick={this.props.handleLogoutSubmit}>LOGOUT</button>
    </div>
    <div className="container-fluid">
      
    </div>
  </nav>)}}

export default NavBar;
