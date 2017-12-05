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
              <li>
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

  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header" style={{fontSize:"35px"}}>
        <Link className="navbar-brand" to={'/gameplay'} >
        <div style={{fontSize:"35px"}}>
          ArtHunt
        </div>
        </Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link className="nav-link" to="/gameplay" onClick = {this.props.handleGoHome}>
            Activities Center
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/gameplay" onClick = {this.props.handleGoArtCollector}>
            Find Art
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/gameplay" onClick = {this.props.handleGoArtCollection}>
            My Art Collection
            </Link>
          </li>
        </ul>
      

        {logParts}
        </div>
    </div>
    <div className="container-fluid">
      
    </div>
  </nav>)}}

export default NavBar;
