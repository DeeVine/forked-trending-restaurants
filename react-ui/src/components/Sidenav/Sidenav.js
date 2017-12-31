import React from "react";
// import { Link } from "react-router-dom";
import "./Sidenav.css";

// Depending on the current path, this component sets the "active" classNameNameName on the appropriate navigation link item
const Sidenav = () =>
  <div className='sidenav'>
  	<div className='profile'>
  		<img alt='profile pic' src='https://media1.popsugar-assets.com/files/thumbor/DDLEMrJEXIVZE1yEqjgGkaV4A_o/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/11/20/331/n/38922823/tmp_K8R88E_9dbe2b2dc2476118_food.jpg'/>
  	<p>Profile Name<i className="arrow-down"></i></p>
  	</div>
  	<hr></hr>
    <ul>
    	<li><i className='fa fa-fire' aria-hidden="true"></i> Best Trending Restaurants</li>
    	<li><i className='fa fa-spoon' aria-hidden="true"></i> Restaurants Saved</li>
    	<li><i className='fa fa-photo' aria-hidden="true"></i> Photos</li>
    </ul>
  </div>

export default Sidenav;