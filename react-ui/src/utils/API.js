import axios from "axios";

export default {
  APIsearch: function(url, params, headers) {
    return axios.get(url, {
      params: params,
      headers: headers
    })
  },

  AllReviews: function () {
    return axios.get("api/restaurants");
  },

  filterSearch: function(type, filter) {
    return axios.get('api/restaurants/filter/' + type +'?filter=' + filter)
  },

  testQuery: function (name) {
    return axios.get("api/restaurants/" + name);
  },
  
  returnDetails: function(id) {
    return axios.get('api/restaurants/id/' + id);
  }
}