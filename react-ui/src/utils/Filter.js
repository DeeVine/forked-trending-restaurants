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
	}
}