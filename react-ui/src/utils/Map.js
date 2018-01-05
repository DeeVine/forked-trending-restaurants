import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default {
 
    geoCode(address){
    	console.log('GEOCODE RUNSNSSSSS')
    	const coordinates = {}
    	geocodeByAddress(address)
      	.then(results => getLatLng(results[0]))
      	.then(latLng => {
      		console.log(latLng)
      		let coordinates = latLng

      		return coordinates
      	})
      }
  	
}