import axios from "axios";
import Mathy from './Mathy.js'
import Round from './Round.js'
export default {
	getTop10ByScore: function(sortArr) {
		const top10 = []
		sortArr.sort((a,b) => {
			return a.score - b.score
		})
		for (var i = 0; i < 10; i++) {
			let a = sortArr.pop()
			top10.push(a)
		}
		return top10
	},



	// return daily raw difference averages
	// logic: plug in array of restaurants
	// filter by query_date. get an array with each unique day
	// get average for each day.
	convertDate: function(utc) {
		let queryDate = utc.replace(/ .*/,'');
		return queryDate
	},

	getUniqueDatesArr: function(arr) {
		const uniqueDateArr = []
		arr.map(each => {
			each.query_date = this.convertDate(each.query_date)

			let queryDate = each.query_date
			let index = uniqueDateArr.findIndex(x => x === queryDate)

			if (index === -1) {
				uniqueDateArr.push(queryDate)
			}
		})
		return uniqueDateArr
	},

// finds daily avg depending on what array is being thrown into it
	dailyDiffAvg: function(dataArr) {
		let obj = {
			'checkins': {},
			'rating_count': {},
			'reviews': {}
		}
		// loops through passed array of restaurants
		dataArr.forEach(item => {

			// converts each restaurant data into differences, %change, and date
			let diffandDatesCheckins = Mathy.getDiffwithDate(item.checkins, 'checkins');
			let diffandDatesRatings = Mathy.getDiffwithDate(item.rating_count, 'rating_count');
			let diffandDatesReviews = Mathy.getDiffwithDate(item.reviews, 'review_count');

			// loops through converted array to ouput array of unique dates
			const uniqueDateArr = [];
			diffandDatesCheckins.map(each => {
				each.query_date = this.convertDate(each.query_date);

				let queryDate = each.query_date;
				let index = uniqueDateArr.findIndex(x => x === queryDate);

				if (index === -1) {
					uniqueDateArr.push(queryDate);
				}
			})
			// groups array of values into obj by date
			diffandDatesCheckins.forEach(bam => {
				bam.query_date = this.convertDate(bam.query_date)
			})

			diffandDatesRatings.forEach(bam => {
				bam.query_date = this.convertDate(bam.query_date)
			})

			diffandDatesReviews.forEach(bam => {
				bam.query_date = this.convertDate(bam.query_date)
			})

			uniqueDateArr.forEach(value => {
				let checkinsFilteredArr = diffandDatesCheckins.filter(boom => boom.query_date === value)
				let ratingsFilteredArr = diffandDatesRatings.filter(boom => boom.query_date === value)
				let reviewsFilteredArr = diffandDatesReviews.filter(boom => boom.query_date === value)

				if (obj['checkins'][value] === undefined) {
					obj['checkins'][value] = []
					obj['checkins'][value].push(checkinsFilteredArr[0].difference)
				} else {
					obj['checkins'][value].push(checkinsFilteredArr[0].difference)
				}
				if (obj['rating_count'][value] === undefined) {
					obj['rating_count'][value] = []
					obj['rating_count'][value].push(ratingsFilteredArr[0].difference)
				} else {
					obj['rating_count'][value].push(ratingsFilteredArr[0].difference)
				}
				if (obj['reviews'][value] === undefined) {
					obj['reviews'][value] = []
					obj['reviews'][value].push(reviewsFilteredArr[0].difference)
				} else {
					obj['reviews'][value].push(reviewsFilteredArr[0].difference)
				}
			})
		})

		// find avg for each date in obj
		Object.keys(obj.checkins).map((objectKey, index) => {
			let value = obj.checkins[objectKey]
			obj.checkins[objectKey] =	Round(Mathy.getMean(value), -6)
		})
		Object.keys(obj.rating_count).map((objectKey, index) => {
			let value = obj.rating_count[objectKey]
			obj.rating_count[objectKey] =	Round(Mathy.getMean(value), -6)
		})
		Object.keys(obj.reviews).map((objectKey, index) => {
			let value = obj.reviews[objectKey]
			obj.reviews[objectKey] =	Round(Mathy.getMean(value), -6)
		})
		return obj
	}

}