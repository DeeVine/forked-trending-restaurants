import React from "react";
import "./Searched.css";

export const Searcheditems = props => (
  <li className='list-group-item' onClick={props.showDetails} value={props.value}>
  	{props.children}
  </li>
);