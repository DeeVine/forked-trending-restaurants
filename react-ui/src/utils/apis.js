import axios from "axios";

export default {
	APIsearch: function(url, params, headers) {
		return axios.get(url, {
			params: params,
			headers: headers
		})
	}

	
}