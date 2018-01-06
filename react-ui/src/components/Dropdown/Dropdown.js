import React, {Component} from 'react';
import "./Dropdown.css";

const Dropdown = props =>
  <div className="dropdown" {...props}>
	  <div className="dropdown-trigger">
	    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
	      <span>Dropdown button</span>
	      <span className="icon is-small">
	        <i className="fa fa-angle-down" aria-hidden="true"></i>
	      </span>
	    </button>
	  </div>
	  <div className="dropdown-menu" id="dropdown-menu" role="menu">
	  	<div className="dropdown-content">
	      <a href="#" className="dropdown-item">
	        7 Days
	      </a>
	      <a className="dropdown-item">
	        14 Days
	      </a>
	      <a href="#" className="dropdown-item is-active">
	        21 Days
	      </a>
	      <a href="#" className="dropdown-item">
	        28 Days
	      </a>
	      <hr className="dropdown-divider"/>
	      <a href="#" className="dropdown-item">
	        With a divider
	      </a>
	    </div>
	  </div>
  </div>
  
export default Dropdown;