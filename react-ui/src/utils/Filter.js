import axios from "axios";

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

	dailyDiffAvg: function(resData) {
		let labels = resData.checkins.map(checkins => {
			let queryDate = checkins.query_date.replace(/ .*/,'');
			console.log(queryDate)
		})
	}

}