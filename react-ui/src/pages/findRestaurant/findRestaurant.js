import React, {Component} from 'react';
import { Input, Form, Searchbtn } from "../../components/Form";
import { Searched, Searcheditems, FbSearchedItems } from "../../components/Searched";
import Chart from "../../components/Chart";
import Sidenav from "../../components/Sidenav";
import API from "../../utils/API.js";
import { Details } from "../../components/Details"
import FilterData from "../../components/FilterData"
import "./findRestaurant.css";
import numjs from 'numjs';
import Mathy from "../../utils/Mathy.js";
import Yelp from "../../utils/Yelp.js";
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import moment from 'moment';
import geolib from 'geolib';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Map from "../../utils/Map.js";
import Filter from '../../utils/Filter.js';

//Need to pass value from input field
//Style chart and info into one element
//Allow to click on element to view stats
//Create separate chart components/arrays for rating, rating count, checkins, review count, star_rating
class findRestaurant extends Component {

	constructor (props) {
		super(props);
		this.state = {
			restaurantArr: [],
			restaurantName: "Homeroom",
			restaurantInfo: {},
			coordsIdsArr: [],
			restaurantDetails: false,
			restaurantId: "",
			filter: 'price',
			filteredRestaurants: '',
			fbAPIResults: {},
			details: false,
			filteredTotal: "",
			allTotal: "",
			priceTotal: "",
			categoryTotal: "",
			totalAvg: "",
			chartData: {
					labels: [10,20],
					datasets: [
						{
							label: 'Difference',
							data: [11,21],
							backgroundColor: [
												'rgba(255, 99, 132, 0.2)',
										]
						}
					]
			},
			searchedRestaurant: {},
			showsidenav: true,
			showline: true,
			showbar: true,
			onSearchClick: true,
			address: "",
		};
		this.onChange = (restaurantName) => this.setState({ restaurantName })
	}
  
  componentWillMount() {
		API.AllReviews()
		.then(res => {
			const coordsArr = []
			res.data.forEach(item => {
				coordsArr.push({
					yelpId: item.yelpId,
					coordinates: item.coordinates,
					score: item.trending_score
				})
			})
			// this.findPercentChange(res.data,'checkins', 'checkins')
			// this.findPercentChange(res.data,'rating_count', 'rating_count')
			// this.findPercentChange(res.data,'reviews', 'review_count')
		console.log('BEFORE GEOLOCATE')
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				console.log(position)
				let userCoordinates = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				};
				this.setState({
					restaurantInfo: res.data,
					coordsIdsArr: coordsArr,
					userCoordinates: userCoordinates
				})
			})
		} else {
			this.setState({
				restaurantInfo: res.data,
				coordsIdsArr: coordsArr,
				userCoordinates: null
			})
		}
		// 	console.log('Hi')


		// 	})
		// } else {

		// }

		})
		.catch(err => console.log(err));

  }

	//handle Submit for Geolocation

	handleFormSubmit = (event) => {
    return Map.geoCode(this.state.restaurantName)
  };



  	//create labels and data arrays and sets chartData state
	generateChartData = (res) => {
		// const differenceArr = res[0].rating_count;		
		let labels = res.map(checkins => {
			let queryDate = checkins.query_date.replace(/ .*/,'');
			return queryDate;
		})
		//check if current data set is bigger, otherwise leave label state unchanged
		if(labels.length <= this.state.chartData.labels.length) {
			labels = this.state.chartData.labels;
		}
		const data = res.map(checkins => {
			return checkins.difference
		})
		//generate random color for new dataset
		const dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgba(" + r + "," + g + "," + b + ", 0.2)";
        };

        let datalabel = '';

    	let index = this.state.chartData.datasets.findIndex( x => x.label === this.state.restaurantDetails.name)

    	if (index === -1) {
    		datalabel = this.state.restaurantDetails.name
    	}
    	else {
    		datalabel = this.state.restaurantDetails.name + '1'
    	}

    	const labelArray = this.state.chartData.datasets.map(index => {
    		return index.label;
    	})

    	let numberoftimes = labelArray.filter(word => word === this.state.restaurantDetails.name+"1")

		this.setState({
			chartData: {
				labels: labels,
				datasets: this.state.chartData.datasets.concat([
					{
						label: datalabel,
						data: data,
						backgroundColor: [dynamicColors()]
					}
				])
			}
		}, () => {
			console.log(this.state);
		})
	};

    //update state whenever field input changes
  handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

  geoCode = (address) => {
  	geocodeByAddress(address)
    	.then(results => getLatLng(results[0]))
    	.then(latLng => {
    		this.setState({
    			geoCodeAddress: latLng
    		})
    	})
  };

	searchRestaurant = event => {
		event.preventDefault();
		if (this.state.restaurantName) {

			this.geoCode(this.state.restaurantName)

			const nameQue = (data) => {
				API.nameQuery(this.state.restaurantName)
				.then(res => {
					// if no result found, start add new firm functions
					// indexof, if data matches res.data, then take out
					let fbResults = []
					if (res.data[0]) {
						data.forEach(item => {

							if (item.id !== res.data[0].fbId) {
								fbResults.push(item)
							}
						})
					} else {
						fbResults = data
					}
					this.setState({
						fbAPIResults: fbResults,
						searchedRestaurant: res.data,
					})
					console.log(this.state);
					// this.generateChartData(this.state.restaurantInfo)
				})
				.catch(err => console.log(err));
			}

			// searches through fb api before sending it through db api
			const access = 'EAAG0XCqokvMBAPYkq18AYZCRVI1QaWb9HU9ti4PpFL5lZAL32p53Ql1zREzbBi9ikoXwdwgsyZB6Cjv9YjghpfQmWPZCBBtWMnGaqknAecNhQzpBNWKCZCFYM36P0IRP8QSnOlzHdxod6y8mZA3cOpdxlu7XZAtqIv9AhZBXdPyPsAZDZD'
			let url = 'https://graph.facebook.com/v2.7/search'
			let params = {
				type: 'place',
				q: this.state.restaurantName,
				center: '37.8044,-122.2711',
				distance: 10000,
				limit: 100,
				fields: 'name,single_line_address,phone, location,is_permanently_closed',
				access_token: access
			}
			API.APIsearch(url, params)
				.then(res => {
					nameQue(res.data.data)
				})
				.catch(err => console.log(err))

		}
  };

	showDetails = event => {
		const array = []
		const id = event.currentTarget.getAttribute('value');
		API.returnDetails(id)
			.then(res => {
				console.log(res.data[0])

				let checkinsAvg = Mathy.findRoundedDiffMean(res.data[0].checkins, 'checkins')
				let reviewsAvg = Mathy.findRoundedDiffMean(res.data[0].reviews, 'review_count')
				let ratingsAvg = Mathy.findRoundedDiffMean(res.data[0].rating_count, 'rating_count')
				let diff = Mathy.getDiffwithDate(res.data[0].checkins, 'checkins');
				let ratingDiff = Mathy.getDiffwithDate(res.data[0].rating_count, 'rating_count');
				let reviewDiff = Mathy.getDiffwithDate(res.data[0].reviews, 'review_count');
				// let totalAvg = this.findTotalStats(this.state.restaurantInfo)

				this.setState({
					restaurantDetails: res.data[0],
					details: true,
					checkinsAvg: checkinsAvg,
					reviewsAvg: reviewsAvg,
					ratingsAvg: ratingsAvg,
					diffArr: diff,
					ratingDiff: ratingDiff,
					reviewDiff: reviewDiff
					// totalAvg: totalAvg
				})
				console.log(this.state)
				this.generateChartData(this.state.diffArr)
			})
			.catch(err => console.log(err))
	};

	//create an array with differences for all restaurants in restaurantInfo
	findPercentChange = (resData,arraytocheck, arrayvariable) => {
		//array to hold the daily increase in ratings, reviews, checkins
		const allDifferences = []
		//create array with differences for all restaurnts in restaurant info
		resData.map(item => {
			// console.log(item)
			let obj = {}
			let diff = Mathy.getDiffwithDate(item[arraytocheck], arrayvariable)
			obj.yelpId = item.yelpId
			obj.diff = diff
			allDifferences.push(obj)
		})
		// console.log(allDifferences)
		const compareAll = []
		// find difference week over week
		allDifferences.map(item => {
			//object to hold yelpId and weeklyChange
			let compare = {}
			let percentChange1 = 0
			let percentChange2 = 0
			let weeklyChange = 0
			let weeklyChangePercent = 0

			//Switch goes here to determine 7, 14, 21, or 30 days

			//first week
			item.diff.slice(0, 3).map(item => {
				percentChange1 += item.percentChange
			})
			//second week
			item.diff.slice(3, 6).map(item => {
				percentChange2 += item.percentChange
			})
			weeklyChange = percentChange2 - percentChange1
			compare.yelpId = item.yelpId
			compare.weeklyChange = weeklyChange
			compare.weeklyChangePercent = weeklyChange/percentChange1
			compareAll.push(compare)
		})
		const stateParam = arraytocheck + 'change';

		//sort arrays based on weekly percent change in descending order
		let sortedCompare = compareAll.sort(function (a, b) {
				  return b.weeklyChangePercent - a.weeklyChangePercent
				})
				this.setState({
					[stateParam]: sortedCompare
				}, ()=> {
				})
		// this.setState({
		// 	[stateParam]: compareAll
		// }, () => {
		// 		console.log(this.state)
		// 		let sortedCompare = compareAll.sort(function (a, b) {
		// 		  return b.weeklyChangePercent - a.weeklyChangePercent
		// 		})

		// 		this.setState({
		// 			[stateParam]: sortedCompare
		// 		}, ()=> {
		// 			console.log(this.state)
		// 		})

		// 		console.log(sortedCompare)
		// 	})
	};

	loadFilter = (ev) => {
		console.log(ev.target.value)

		if (ev.target.value === 'price') {
			this.setState({
				totalAvg: this.state.priceTotal
			})
		} else if (ev.target.value === 'all') {
			this.setState({
				totalAvg: this.state.allTotal
			})
		} else {
			this.setState({
				totalAvg: this.state.categoryTotal
			})
		}
	};

	getTotals = () => {
		// gets price total then sends to getalltotal, then getscategoriestotal
		API.filterSearch('price', this.state.restaurantDetails.price)
		.then(res => {
			const priceData = res.data
			let priceTotal = Mathy.findTotalStats(priceData)
			getAllTotal(priceTotal, getCategoryTotal, priceData)
			
		})
		.catch(err => console.log('ERROR: ',err))
		
		const getAllTotal = (priceTotal, getCategoryTotal, priceData) => {
			const allTotal = Mathy.findTotalStats(this.state.restaurantInfo)
			getCategoryTotal(priceTotal, allTotal, priceData)
		}
		
		const getCategoryTotal = (priceTotal, allTotal, priceData, eachDayTotal) => {
			let categoryTotal;
			let categories = this.state.restaurantDetails.categories
			let arrFirms = []
		
			categories.forEach(item => {
	
				API.filterSearch('category', item.title)
				.then(res => {
						const categoryData = res.data
						categoryData.forEach(item => {
							var index = arrFirms.findIndex(x => x.name === item.name)
	
							if (index === -1) {
								arrFirms.push(item)
							}	else {
								console.log('no push')
							}
						})
						categoryTotal = Mathy.findTotalStats(arrFirms)
						this.setState({
							priceTotal: priceTotal,
							allTotal: allTotal,
							categoryTotal: categoryTotal
							})
				.catch(err => console.log(err))
				})
			})
		}
	};

	onClick = () => {
    this.setState({ showsidenav: !this.state.showsidenav });
   };

    onSearchClick =() => {
    	this.setState({searchIcon: !this.state.searchIcon} );
    console.log('i was clicked');
  };
  closeSearch=() => {
  	console.log('i was searched')
  	this.setState({searchIcon: !this.state.searchIcon} );
  }
	showline = () => {
			this.setState({ showline: !this.state.showline });
	};

	showbar = () => {
			this.setState({ showbar: !this.state.showbar });
	};

// looks for yelpId via information sent from clicking on
// search result. sends to yelpAPI in utils to pull info
// and send to DB
	getYelpAddToDb = (ev) => {
		console.log('getYelpAddToDb')
		const id = ev.currentTarget.getAttribute('value')
		const name = ev.currentTarget.getAttribute('data-name')
		const city = ev.currentTarget.getAttribute('data-city')
		const address = ev.currentTarget.getAttribute('data-address')
		let phone
		if (ev.currentTarget.getAttribute('data-phone')) {
			phone = ev.currentTarget.getAttribute('data-phone')
			phone = Yelp.convertPhone(phone)
		} else {
			phone = null
		}
		
		// console.log(phone)
		Yelp.yelpAPI(id, name, address, phone, city)
	};

	findClosestRestaurants = (query) => {
		var geo
		if (this.state.userCoordinates === null) {
			geo = {latitude: 37.82306519999999, longitude: -122.24868090000001}
		} else {
			geo = this.state.userCoordinates
		}
		const compareArr = this.state.coordsIdsArr
		const newArr = []
		// loops through coordsid array, gets distnace from compare and inputs into new array
		compareArr.forEach(item => {
			let coords = item.coordinates
			let distance = geolib.getDistance(geo, coords)
			newArr.push({
				yelpId: item.yelpId,
				distance: distance,
				coordinates: coords,
				score: item.score['7day']['checkins']
			})
			
		})

		// sort by distance
		newArr.sort((a,b) => {
			return a.distance - b.distance
		})

		// take closest 30 and sort by highest score
		const loop = 30 - newArr.length
		const length = loop*-1

		for (let i = 0; i < length; i++) {
			newArr.pop()
		}
		const top10Arr = Filter.getTop10ByScore(newArr)
		// display to HTML
		this.setState({
			top10Distance: top10Arr
		})
		console.log(this.state)
	};

	findDailyDiffAvg = (filtered_arr) => {
		console.log(this.state)

		const dailyAvg = Filter.dailyDiffAvg(this.state.restaurantInfo)
		console.log(dailyAvg)
		this.setState({
			dailyCheckinAvgObj: dailyAvg
		})
	};

	render() {

		const inputProps = {
	      value: this.state.restaurantName,
	      onChange: this.onChange,
	    }

		return (
		<div>
			<div className="wrapper">	
			{/*Main section*/}
				<button onClick={this.findDailyDiffAvg}>DailyDiffAvg</button>
				<button onClick={this.findClosestRestaurants}>BLAHHHH</button>
				<button onClick={this.onClick}>showsidenav true</button> 
				<button onClick={this.showline}>showline</button> 
				<button onClick={this.showbar}>showbar</button> 
				<button onClick={this.findPercentChange}>findDiffall</button> 

				<a onClick={this.onSearchClick}>
					<div className="input-with-icon">
				       <i className="fa fa-search"></i>
					</div>
				</a>

				

		      	<div className="data-section columns">
					

		      		{ this.state.showsidenav ? 
		      			<div className="side-nav column is-2">
			      			<CSSTransitionGroup
								transitionName="example"
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionEnter={false}
								transitionLeave={true}>
				      			<Sidenav/>
				      		</CSSTransitionGroup>
			      		</div>  		
		      		: null }
		      		
		      		<div className="column auto">
		      			<div className='columns'>
		      				<div className="column is-12">
		      					<h1> Find A Restaurant </h1>
										<form>
											


										
											<div id='search-restaurant'>
													{this.state.searchedRestaurant.length ? (
														<CSSTransitionGroup
													transitionName="example"
													transitionAppear={true}
													transitionAppearTimeout={500}
													transitionEnter={false}
													transitionLeave={true}>
															<Searched>
																{this.state.searchedRestaurant.map(restaurant => (
																	<Searcheditems className='searcheditems' key={restaurant._id} showDetails={(ev) => this.showDetails(ev)}
																		value={restaurant._id}
																	>              
																		<p> Name of Restaurant: {restaurant.name} </p>
																		<p> Address: {restaurant.location.address}, {restaurant.location.city}, {restaurant.location.state} </p>
																		<p> Data Summary: 
																			<ul>
																				<li>Yelp Rating: {restaurant.rating[0].rating} </li>
																				<li>Yelp URL: <a href={restaurant.yelpURL} target='blank'>{restaurant.name}</a></li>
																			</ul>
																		</p>
																	</Searcheditems>
																	))}
															</Searched>
														</CSSTransitionGroup>
												) : (
												<h3>No Results to Display</h3>
												)}
												<h4> FB API Search results </h4>
												{this.state.fbAPIResults.length ? (
													<CSSTransitionGroup
														transitionName="example"
														transitionAppear={true}
														transitionAppearTimeout={500}
														transitionEnter={false}
														transitionLeave={true}
													>
														<Searched>
															{this.state.fbAPIResults.map(restaurant => (
																<FbSearchedItems className='searcheditems' key={restaurant.id} getYelpAddToDb={(ev) => this.getYelpAddToDb(ev)}
																	value={restaurant.id}
																	dataName={restaurant.name}
																	dataAddress={restaurant.location.street}
																	dataCity={restaurant.location.city}
																	dataPhone={restaurant.phone}
																>
																	<p> Name of Restaurant: {restaurant.name} </p>
																	<p> Address: {restaurant.single_line_address} </p>
																	<p> Phone: {restaurant.phone} </p>
																</FbSearchedItems>
															))}
														</Searched>
													</CSSTransitionGroup>
												) : (
													<h4>No results from Facebook API </h4>
												)}
											</div> 		    
						    		</form>
		      				</div>
		      			</div>
		      			<div className='columns'>
			      			<div className="column is-three-fifths">
					      		<Chart className='charts' chartData={this.state.chartData} chartName="Average Checkins by Date"
					      		 showline={this.state.showline} showbar={this.state.showbar}legendPosition="top"/>
					      	</div>
					      	<div className="column auto">
					      		<div className="data-navigation">
					      			<p class='percentage'>+75% Increase</p>
					      			<p class='percentage'>-30% Decrease</p>
											{this.state.details ? (
												<Details 
													name={this.state.restaurantDetails.name}
													checkins={this.state.restaurantDetails.checkins}
													checkinsAvg={this.state.checkinsAvg}
													ratingCountAvg={this.state.ratingsAvg}
													reviewsAvg={this.state.reviewsAvg}
													totals={this.state.totalAvg}
													handleInputChange={this.handleInputChange}
													loadFilter={this.loadFilter}
													getTotals={() => this.getTotals()}
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
									</div>
								</div>	
			    		</div>
			    	</div>


			    	{ this.state.searchIcon ? 
		      			<div className="side-nav column is-12">
			      			<CSSTransitionGroup
								transitionName="example"
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionEnter={false}
								transitionLeave={true}>
								<div className='searchIcon'>
				      			<PlacesAutocomplete
									inputProps={inputProps}
									value={this.state.restaurantName}
									onChange={this.handleInputChange}
									name="restaurantName"
									placeholder="restaurant"
								/>

								<button type="submit"
													disabled={!(this.state.restaurantName)}
													onClick={this.searchRestaurant}
													onClick={this.closeSearch}
											>
												Search Restaurant
											</button>
								</div>
				      		</CSSTransitionGroup>
			      		</div>  		
		      		: null }
		      	{/*<div id='restaurants'>
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
													<li>Yelp URL: <a href={restaurant.yelpURL} target='blank'>{restaurant.name}</a></li>
												</ul>
											</p>
				            </Searcheditems>
				          	))}
			       		</Searched>
						) : (
						<h3>No Results to Display</h3>
						)}
			    </div>*/}
				</div>
			
		</div>
	)
};
}

export default findRestaurant;