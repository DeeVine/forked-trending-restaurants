import React from "react";
import "./Searched.css";

export const FbSearchedItems = props => (
  <li 
  	className='list-group-item'
  	onClick={props.getYelpAddToDb}
  	value={props.value}
  	data-address={props.dataAddress}
  	data-city={props.dataCity}
  	data-name={props.dataName}
  	data-phone={props.dataPhone}
  >
  	{props.children}
  </li>
);