import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png";

// Depending on the current path, this component sets the "active" classNameNameName on the appropriate navigation link item
const Navbar = () =>
  <nav className="level">
    <p className="level-item has-text-centered">
      <p className={window.location.pathname === "/" ? "active" : ""}>
        <Link to="/"><a href="#" className="navLinks button is-link">Home</a></Link>
      </p>
    </p>
    <p className="level-item has-text-centered">
      <Link to="/"><a href="#" className="navLinks button is-link">Home</a></Link>
    </p>
    <p className="level-item has-text-centered">
      <img src={logo} className="logo_page" />
    </p>
    <p className="level-item has-text-centered">
      <Link to="/Restaurant"><a href="#" className="navLinks button is-link">Find A Restaurant</a></Link>
    </p>
    <p className="level-item has-text-centered">
      <Link to="/Login"><a href="#" className="navLinks button is-link">Login</a></Link>
    </p>
  </nav>

export default Navbar;