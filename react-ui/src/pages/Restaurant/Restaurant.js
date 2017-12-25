import React, {Component} from 'react';
import API from "../../utils/API.js";
import "./Restaurant.css";

//Need to pass value from input field

class Restaurant extends Component {

	state = {
		restaurantArr: [],
		restaurantName: "Homeroom"
	};

	loadRestaurants = () => {
    	API.AllReviews()
    	.then(res => {
			console.log(res)
			// let dataArray = res;
			// console.log(dataArray);
			// let reviews = res.data[0].reviews;
			// let date = res.data[0].reviews[0].query_date;
			// console.log(date);
			// console.log(reviews);
			// // console.log(moment(date).format('LL'));
			// let firstdate = date.replace(/ .*/,''); //extract date from timestamp
			// console.log('firstdate: ' + firstdate);
			// console.log('res.data.length: ' + res.data.length)
			// const dateArray = res.data;
			// console.log(dateArray);

			// let comparisonDate = dateArray[0].reviews[0].query_date //date of first array item to compare against
			// // // const sortedArray = [dateArray[0].reviews[0].review_count]; //create array with initial value
			// // console.log(sortedArray);

			// const sortedArray = [];
			// var inner = [];

			// for (var i = 0; i < dateArray.length; i++) {
			// 	let querydate = dateArray[i].reviews[0].query_date;
			// 	if (comparisonDate === querydate){
			// 		inner.push(dateArray[i].reviews[0].review_count); //push review count into array
			// 	} else {
			// 		sortedArray.push(inner);
			// 		inner = [dateArray[i].reviews[0].review_count];
			// 	}
			// 	comparisonDate = querydate;
			// 	//if last array item, push inner array into sortedArray;
			// 	if(i === dateArray.length-1){
			// 		sortedArray.push(inner);
			// 	}
			// }
			// console.log(sortedArray);
    	})
    	.catch(err => console.log(err));
    };

    testQuery = name => {
    	API.testQuery(name)
    	.then(res => {
			console.log(res)
    	})
    	.catch(err => console.log(err));
    };

	render() {
		return (
		<div>
			<h1>
				Home Home Home
			</h1>
			<button onClick={this.loadRestaurants}>
				load restaurants
			</button>
			<button onClick={() => this.testQuery(this.state.restaurantName)}>
				load test query
			</button>

			<button onClick={() => this.getAPIData()}>
				button
			</button>
			<button onClick={this.yelppy}>
				Yelp Button
			</button>
		</div>

		)
	}
}

export default Restaurant;