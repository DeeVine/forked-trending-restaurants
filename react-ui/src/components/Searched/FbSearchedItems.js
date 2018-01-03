import React from "react";
import "./Searched.css";

export const FbSearchedItems = props => (
  <li className='list-group-item' onClick={props.getYelpAddToDb} value={props.value}>
  	{props.children}
  </li>
);