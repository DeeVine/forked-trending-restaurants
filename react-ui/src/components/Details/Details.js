import React from 'react';
let count = 0
export const Details = (props) => (
	<div className="details">
		<h3>
		{props.name}
		</h3>
		{props.checkins.map(item => (
			<p>{item.checkins}</p>
		))}
		<h3>
			Avg Checkins </h3>
		<p>{props.checkinsAvg}</p>
		<h3>
			Avg rating count </h3>
		<p>{props.ratingCountAvg}</p>
		<h3>
			Avg review count </h3>
		<p>{props.reviewsAvg}</p>
		<h3> Total Checkins Mean</h3>
			<p>{props.totals.checkinsMean}</p>
		<h3> Total Ratings Mean</h3>
			<p>{props.totals.ratingsMean}</p>
		<h3> Total Reviews Mean</h3>
			<p>{props.totals.reviewsMean}</p>
		<select
		onClick={props.loadFilter}
		>
			<option>Filter</option>
		  <option value="price">Price</option>
		  <option value="category">Category</option>
		</select>
	</div>
)