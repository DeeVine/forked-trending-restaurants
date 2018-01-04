import API from "./API.js";
import phoneNumber from 'awesome-phonenumber';

export default {
	yelpAPI: function(id, name, address, phone, city) {
		// const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/search'
		const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
		const headers = {
			Authorization: "Bearer Dt0X2kf0ef_hQ5Jc_5FNnxheSlXdFX1-svTZE6AJP0J4lBoVuMFRl66QgPFblxpMN-_AHN9OL3mek81qVap7DEtTMK2MrXxXpTxV31SVTbe-qajxmCEGj_nHwuEuWnYx"
		};
		const params = {
			term: '/'+name+'/',
			location: address + ", " + city + ', ' + 'CA'
		}
		console.log(params)
		API.APIsearch(url, params, headers)
			.then(res => {
				console.log(res)
				let data = res.data.businesses;
				if (data) {
					const obj = {
						fbId: id,
						yelpId: ""
					};
					console.log(data);
					if (phone) {

						var index = data.filter(x => x.phone === phone)
						if (index.length) {
							obj.yelpId = index[0].id
						} else {
							obj.yelpId = null
						}
						
					} else {

						obj.yelpId = data[0].id

					}

					if (obj.yelpId !== null) {
						console.log(obj)
						API.postNewRestaurant(obj)
							.then(res => console.log(res))
							.catch(err => console.log(err))
					}
				} else {
					console.log('no results found');
				}
			})
			.catch(err=>console.log(err));
		// this.yelpDetails(yelpIdArr);
	},

	convertPhone: function(phoneNum) {
		console.log(phoneNum)
		var pn = new phoneNumber(phoneNum, 'US');
		const converted = pn.getNumber('e164')
		console.log(converted)
		return converted
	}
}