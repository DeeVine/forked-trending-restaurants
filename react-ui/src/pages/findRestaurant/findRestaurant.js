import React, {Component} from 'react';
import { Input, Form, Searchbtn } from "../../components/Form";
import { Searched, Searcheditems } from "../../components/Searched";
import Chart from "../../components/Chart";
import API from "../../utils/API.js";
import { Details } from "../../components/Details"
import FilterData from "../../components/FilterData"
import "./findRestaurant.css";
import numjs from 'numjs';
import Mathy from "../../utils/Mathy.js";

//Need to pass value from input field
//Style chart and info into one element
//Allow to click on element to view stats
//Create separate chart components/arrays for rating, rating count, checkins, review count, star_rating

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
				console.log(res);
				console.log(res.data);
				this.setState({
					restaurantInfo: res.data
				})
				// this.generateChartData(this.state.restaurantInfo);
				console.log(this.state);
			})
			.catch(err => console.log(err));
  	};

  	//create labels and data arrays and sets chartData state
	generateChartData = (res) => {
		// const differenceArr = res[0].rating_count;		
		const labels = res.map(checkins => {
			let queryDate = checkins.query_date.replace(/ .*/,'');
			return queryDate;
		})		
		const data = res.map(checkins => {
			return checkins.difference
		})

		this.setState({
			chartData: {
				labels: labels,
				datasets: [
					{
						label: 'Difference',
						data: data,
						backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ]
					}
					// ,{
					// 	label: 'rating',
					// 	data: [952, 970, 120],
					// 	backgroundColor: [
			  //               'rgba(54, 162, 235, 0.2)',
			  //               'rgba(255, 206, 86, 0.2)',
			  //               'rgba(75, 192, 192, 0.2)',
			  //               'rgba(153, 102, 255, 0.2)',
			  //               'rgba(255, 159, 64, 0.2)'
			  //           ]	
					// }
				]
			}
		}, () => {
			console.log(this.state);
		})
	};

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

    //update state whenever field input changes
    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	searchRestaurant = event => {
		event.preventDefault();
		if (this.state.restaurantName) {
			API.testQuery(this.state.restaurantName)
			.then(res => {
				this.setState({
					restaurantInfo: res.data
				})
				console.log(res);
				console.log(this.state);
				// this.generateChartData(this.state.restaurantInfo)
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
				console.log(res.data[0])
				let checkinsAvg = this.findDifference(res.data[0].checkins, 'checkins')
				let reviewsAvg = this.findDifference(res.data[0].reviews, 'review_count')
				let ratingsAvg = this.findDifference(res.data[0].rating_count, 'rating_count')
				let diff = this.findDiff(res.data[0].checkins, 'checkins');
				let ratingDiff = this.findDiff(res.data[0].rating_count, 'rating_count');
				let reviewDiff = this.findDiff(res.data[0].reviews, 'review_count');

				this.setState({
					restaurantDetails: res.data[0],
					details: true,
					checkinsAvg: checkinsAvg,
					reviewsAvg: reviewsAvg,
					ratingsAvg: ratingsAvg,
					diffArr: diff,
					ratingDiff: ratingDiff,
					reviewDiff: reviewDiff
				})
				console.log(this.state)
			})
			.catch(err => console.log(err))
	};

	findDiff = (arr, name) => {
		// returns an arry of obj with date and count
		const values = []
		for (var i = 0; i < arr.length; i++) {
			values.push({
				count: arr[i][name],
				query_date: arr[i]['query_date']
			})
		}

		const diff = []
		for (var i = 0; i < values.length - 1; i++) {
			let difference = values[i+1]['count'] - values[i]['count']
			let percentChange = Mathy.roundValue(difference / values[i]['count'])
			let query_date = values[i+1]['query_date']
			diff.push({
				difference: difference,
				percentChange: percentChange,
				query_date: query_date
			})
		}		

		return diff
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
		let mean = Mathy.getMean(diff)
		return Mathy.roundValue(mean)
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

		const checkinsMean = Mathy.roundValue(checkins.mean(), -2)
		const ratingsMean = Mathy.roundValue(ratings.mean(), -2)
		const reviewsMean = Mathy.roundValue(reviews.mean(), -2)

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
					// call a function, it finds difference, then the average, inputs into obj and returns
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

      <button onClick={() => this.generateChartData(this.state.diffArr) }>
				Get Chart Data
			</button>

       <Chart chartData={this.state.chartData} restaurantName={'Set this in props'} legendPosition="top"/>

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
						checkinsAvg={this.state.checkinsAvg}
						ratingCountAvg={this.state.ratingsAvg}
						reviewsAvg={this.state.reviewsAvg}
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


