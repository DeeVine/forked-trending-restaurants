import React, {Component} from 'react';
import { Input, Form, Searchbtn } from "../../components/Form";
import { Searched, Searcheditems } from "../../components/Searched";
import API from "../../utils/API.js";
import { Details } from "../../components/Details"
import FilterData from "../../components/FilterData"
import "./findRestaurant.css";
import numjs from 'numjs';
import {roundValue, getMean} from "../../utils/Math.js";

//Need to pass value from input field

class findRestaurant extends Component {

	state = {
		restaurantArr: [],
		restaurantName: "Homeroom",
		restaurantInfo: {},
		restaurantDetails: false,
		restaurantId: "",
		filter: 'price',
		filteredRestaurants: '',
		details: false
	};

	componentDidMount() {
    	API.AllReviews()
			.then(res => {
				this.setState({
					restaurantInfo: res.data
				})
				console.log(res);
				console.log(this.state);
			})
			.catch(err => console.log(err));
  };

  // componentDidUpdate() {
  // 	const div = document.getElementById('restaurants')
  // 	if (this.state.restaurantDetails) {
  // 		console.log(this.state.restaurantDetails)
  // 		div.innerHTML= ''
  // 	}
  // 	return true
  // };

	loadRestaurants = () => {
    	API.AllReviews()
    	.then(res => {
			console.log(res)
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

    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.restaurantName) {
			API.testQuery(this.state.restaurantName)
			.then(res => {
				this.setState({
					restaurantInfo: res.data
				})
				console.log(res);
				console.log(this.state);
			})
			.catch(err => console.log(err));
		}
	};

	showDetails = event => {
		const array = []
		const id = event.currentTarget.getAttribute('value');
		API.returnDetails(id)
			.then(res => {
		  	const div = document.getElementById('restaurants')
				div.innerHTML = ''
				this.setState({
					restaurantDetails: res.data[0],
					details: true
				})
			})
			.catch(err => console.log(err))
	};

	findDifference = (arr, name) => {
		const values = []
		for (var i = 0; i < arr.length; i++) {
			values.push(arr[i][name])
		}
		const diff = []
		for (var i = 0; i < values.length - 1; i++) {
			let difference = values[i+1] - values[i]
			diff.push(difference)
		}

		return getMean(diff)
	};



	findTotalStats = (arr) => {
		var checkins = [];
		var ratings = [];
		var reviews = [];
		const obj = {}
		for (var i = 0; i < arr.length; i++) {
			checkins.push(this.findDifference(arr[i].checkins, 'checkins'))
			ratings.push(this.findDifference(arr[i].rating_count, 'rating_count'))
			reviews.push(this.findDifference(arr[i].reviews, 'review_count'))
		}

		checkins = numjs.array(checkins);
		ratings = numjs.array(ratings);
		reviews = numjs.array(reviews);

		const checkinsMean = roundValue(checkins.mean(), -2)
		const ratingsMean = roundValue(ratings.mean(), -2)
		const reviewsMean = roundValue(reviews.mean(), -2)

		obj.checkinsMean = checkinsMean
		obj.ratingsMean = ratingsMean
		obj.reviewsMean = reviewsMean

		return obj;
	};

	loadFilter = (ev) => {
		console.log(ev.target.value)

		if (ev.target.value === 'price') {
			let price = this.state.restaurantDetails.price
			console.log(price)
			API.filterSearch('price', price)
				.then(res => {
					console.log(res)
					this.setState({
						filteredRestaurants: res.data
					})
				})
				.catch(err => console.log('ERROR: ',err))
		} else {
			// for loop through categories and push into array with each found results
			let categories = this.state.restaurantDetails.categories
			// API.filterSearch(categories)
			// 	.then(res => console.log(res))
			// 	.catch(err => console.log(err))
		}
	};

	render() {

		return (
		<div>
			<h1>
				Find A Restaurant
			</h1>
			<form>
	      <Input
	        value={this.state.restaurantName}
	        onChange={this.handleInputChange}
	        name="restaurantName"
	        placeholder="restaurant"
	      />
	      <Searchbtn
	        disabled={!(this.state.restaurantName)}
	        onClick={this.handleFormSubmit}
	      >
	       Search Restaurant
	      </Searchbtn>
	    </form>

      <div id='restaurants'>
	      {this.state.restaurantInfo.length ? (
	        <Searched>
	          {this.state.restaurantInfo.map(restaurant => (
	            <Searcheditems key={restaurant._id} showDetails={(ev) => this.showDetails(ev)}
	            	value={restaurant._id}
	            >              
								<p> Name of Restaurant: {restaurant.name} </p>
								<p> Address: {restaurant.location.address}, {restaurant.location.city}, {restaurant.location.state} </p>
								<p> Data Summary: 
									<ul>
										<li>Yelp Rating: {restaurant.rating[0].rating} </li>
										<li>Yelp URL: {restaurant.yelpURL} </li>
									</ul>
								</p>
	            </Searcheditems>
	          ))}
	        </Searched>
	      ) : (
	        <h3>No Results to Display</h3>
	      )}
	      {this.state.details ? (
					<Details 
						name={this.state.restaurantDetails.name}
						checkins={this.state.restaurantDetails.checkins}
						checkinsAvg={this.findDifference(this.state.restaurantDetails.checkins, 'checkins')}
						ratingCountAvg={this.findDifference(this.state.restaurantDetails.rating_count, 'rating_count')}
						reviewsAvg={this.findDifference(this.state.restaurantDetails.reviews, 'review_count')}
						totals={this.findTotalStats(this.state.restaurantInfo)}
						handleInputChange={this.handleInputChange}
						loadFilter={this.loadFilter}
					/>
					) : (
					null
				)}
				{this.state.filteredRestaurants.length ? (
					<h4> Something </h4>
					// <FilterData />
				) : (
					<h4> Nothing </h4>
				)}
	     </div>

			<button onClick={this.loadRestaurants}>
				load restaurants
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

export default findRestaurant;


