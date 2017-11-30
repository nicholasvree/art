import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props =>
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
      </ul>
    </div>
    <div className="container-fluid">
      
    </div>
  </nav>;

export default Navbar;
