import React, {Component} from 'react';
import API from "../../utils/apis";
import Arrays from './arrays.json';

class Home extends Component {

	state = {
		restaurantArr: []
	};

	loadRestaurants = () => {
    	API.AllReviews()
    	.then(res =>
    		console.log(res)
    		)
    	.catch(err => console.log(err));
    };

	// gets google places api data. pull name, latlng
	getAPIData = (callback) => {
    const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    const params = {
      // input api key here and edit/add params
      "key": "AIzaSyCREGCIasvQ9zwSRnuJmEr3Hco8Oa3RSLw",
      "type":'restaurant',
      "location": "37.8044,-122.2711",
      "radius": "10000.4",
    };
    
    const googleInfoArr = []

    API.APIsearch(url, params)
    	.then((res) => {
    		const data = res.data.results;
    		console.log(res)
    		data.map(item => {
    			// google information
    			let goLocation = item.geometry.location.lat + "," + item.geometry.location.lng;
    			let goName = item.name;
    			let goPlaceId = item.place_id;
    			googleInfoArr.push({
    				goName: goName,
    				// goLocation: goLocation,
    				goPlaceId: goPlaceId
    			});
    		});
    		console.log(googleInfoArr);

    		let pagetoken = res.data.next_page_token;
    		let params = {
    			"key": res.config.params.key,
    			"pagetoken": pagetoken
    		};

    		setTimeout(() => {
					API.APIsearch(url, params)
	    			.then(res => {
							res.data.results.map(item => {
								googleInfoArr.push({
									goName: item.name,
									// goLocation: item.geometry.location,
									goPlaceId: item.place_id
								})
							})
    					console.log(googleInfoArr);


			    		let pagetoken = res.data.next_page_token;
			    		let params = {
			    			"key": res.config.params.key,
			    			"pagetoken": pagetoken
			    		};
			    		
		    			setTimeout(() => {
								API.APIsearch(url, params)
				    			.then(res => {
										console.log(res.data.results);
										res.data.results.map(item => {
											googleInfoArr.push({
												goName: item.name,
												// goLocation: item.geometry.location,
												goPlaceId: item.place_id
											})
										})
						    		this.setState({
						    			restaurantArr: googleInfoArr
						    		});
						    		console.log(this.state.restaurantArr)
						    			
						    		this.placesAPI(this.yelpAPI);
						    		
			    				})
			    			}, 3000)
    				})
    			}, 3000)
    	})
    	.catch(err => console.log(err))

	};

	placesAPI =(callback) => {
    const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json";
    const goPlacesDetArr = [];
    for (var i = 0; i < this.state.restaurantArr.length; i++) {
    	let id = this.state.restaurantArr[i].goPlaceId;
	    let params = {
	      // input api key here and edit/add params
	      "key": "AIzaSyCREGCIasvQ9zwSRnuJmEr3Hco8Oa3RSLw",
	      "placeid": id
    	};
    	API.APIsearch(url, params)
    		.then(res => {
    			let data = res.data.result;
    			let name = data.name;
    			let address = data.address_components[0].long_name + " " + data.address_components[1].long_name;
    			let city = data.address_components[3].long_name;
    			goPlacesDetArr.push({
    				name: name,
    				address: address,
    				city: city
    			})
    		})
    }
    setTimeout(()=> {
     	callback(goPlacesDetArr)
    }, 10000)

	};

	yelpAPI = (arr) => {
		const yelpIdArr = [];
		const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/matches/best";
		const headers = {
			Authorization: "Bearer Dt0X2kf0ef_hQ5Jc_5FNnxheSlXdFX1-svTZE6AJP0J4lBoVuMFRl66QgPFblxpMN-_AHN9OL3mek81qVap7DEtTMK2MrXxXpTxV31SVTbe-qajxmCEGj_nHwuEuWnYx"
		};
		console.log(arr)
		arr.forEach(item =>{
			let params = {
				name: item.name,
				address1: item.address,
				city: item.city,
				state: 'CA',
				country: 'US'
			}
			setTimeout(()=> {
				API.APIsearch(url, params, headers)
					.then(res => {

						let data = res.data.businesses[0].id;
						if (data) {
						console.log(data);
						yelpIdArr.push(data);
						} else {
							console.log(res);
						}
					})
					.catch(err=>console.log(err));
			}, 1000)

		})
		setTimeout(() => {
			this.yelpDetails(yelpIdArr);
		}, 15000)
	};

	yelpDetails = (arr) => {
		const yelpBiz = [];
		const headers = {
			Authorization: "Bearer XwQSC62cYjT-1Gd9r7EumiSbiOyTobUwVsMBWKI-1Ep38A0ea-vRJqg6sm_Ip_blapSeng_Z9wdkCiGYMUNn3Xq8eM3I8FUErqoxJuDp6r3xSKiDTQE2GzAbKAkuWnYx"
		};
		const params = {};
		console.log(arr);
		for (var i = 0; i < arr.length; i++) {
			let id = arr[i];
			let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + id;

			API.APIsearch(url, params, headers)
				.then(res=>{
					let data = res.data;
					let yelpBizInfo = {};
					yelpBizInfo.name = data.name;
					yelpBizInfo.yelpId = data.id;
					yelpBizInfo.price = data.price;
					yelpBizInfo.rating = data.rating;
					yelpBizInfo.total_reviews = {reviews: data.review_count, query_date: {$type: "date"}};
					yelpBizInfo.categories = data.categories;
					yelpBizInfo.phone = data.display_phone;
					yelpBizInfo.yelpURL = data.url;
					yelpBiz.push(yelpBizInfo);
				})
				.catch(err => console.log(err))
		}
		setTimeout(() => {
			console.log(yelpBiz);
		}, 10000)
	};


	yelppy = () => {
	const yelpHeader = {
  'Authorization': 'Bearer Dt0X2kf0ef_hQ5Jc_5FNnxheSlXdFX1-svTZE6AJP0J4lBoVuMFRl66QgPFblxpMN-_AHN9OL3mek81qVap7DEtTMK2MrXxXpTxV31SVTbe-qajxmCEGj_nHwuEuWnYx'
	};
	const yelpTotalReviews = [];
	console.log("****LENGTH****: ",Arrays.yelpArrIds.length);

	for (var i = 0; i < 1; i++) {
		let id = Arrays.yelpArrIds[i].yelpId;
    let yelpURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/";
    yelpURL = yelpURL + id;
    API.APIsearch(yelpURL, undefined, yelpHeader)
      .then(result => {
        yelpTotalReviews.push({
          total_reviews: result.data.review_count
        })
        console.log(yelpTotalReviews)
      })
      .catch(err => console.log(err))
	}
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

			<button
				onClick={() => this.getAPIData()}
			>
			button
			</button>
			<button onClick={this.yelppy}>
				Yelp Button
			</button>
			</div>
		)
	}
}

export default Home;