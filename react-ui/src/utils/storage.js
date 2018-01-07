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




	// to find daily averages based on filter
			const eachDayTotal = (priceTotal, allTotal, categoryTotal, priceData, categoryData) => {
			const oneDetailData = this.state.restaurantInfo;
			const dataArray = [priceData, categoryData, oneDetailData]
			const arrayDates = {
				priceData: [],
				categoryData: [],
				oneDetailData: []
			}
			// goes through each type of filter data collection
			
			const getDailyObjectData = (filter, data) => {
				const compiledData = {
					checkins: [],
					reviews: [],
					rating_count: []
				}
				data.forEach(item => {
					item.checkins.forEach(each => {
						// converts each date into a weekday(numerical value)
						each.query_date = moment(each.query_date).weekday()
						compiledData.checkins.push(each)
						// var index = data.findIndex(x => x.query_date === each.query_date)
						// if (index === -1) {
						// }
					})
					item.reviews.forEach(each => {
						each.query_date = moment(each.query_date).weekday()
						compiledData.reviews.push(each)
					})
					item.rating_count.forEach(each => {
						each.query_date = moment(each.query_date).weekday()
						compiledData.rating_count.push(each)
					})
				})
				console.log(compiledData)
				var daysNumber = [0,1,2,3,4,5,6];
				
				// match unique date array with each in priceData to push into new array
				const days = {
					mon: [],
					tues: [],
					wed: [],
					thurs: [],
					fri: [],
					sat: [],
					sun: []
				}
				compiledData.checkins.forEach(item => {
					var index = daysNumber.filter(x => x === item.query_date)

					switch(index[0]) {
						case 1:
							days.mon.push(item)
							break;
						case 2:
							days.tues.push(item)
							break;
						case 3:
							days.wed.push(item)
							break;
						case 4:
							days.thurs.push(item)
							break;
						case 5:
							days.fri.push(item)
							break;
						case 6:
							days.sat.push(item)
							break;
						case 0:
							days.sun.push(item)
							break;
					}
				})
				compiledData.checkins = days
				console.log(compiledData)

			const dailyPriceFilter = getDailyObjectData('price', priceData)
			// const flatten = (arr) => arr.reduce((flat,next) => flat.concat(next), [])
			// produces array of objects with all dates, organized.
			// console.log(flatten(allArray))
			// seperates into 7 different arrays, Mon-Sun
			this.setState({
				priceTotal: priceTotal,
				allTotal: allTotal,
				categoryTotal: categoryTotal,
				dailyPriceFilter: {
					checkins: {},
					rating_count: {},
					reviews: {}
				},
				dailyAllFilter: {
					checkins: {},
					rating_count: {},
					reviews: {}
				},
				dailyCategoryFilter: {
					checkins: {},
					rating_count: {},
					reviews: {}
				}
			})
		}