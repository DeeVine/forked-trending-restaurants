import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default {
     
 
    geoCode(address){
    	geocodeByAddress(address)
      	.then(results => getLatLng(results[0]))
      	.then(latLng => console.log(latLng))
      }
  

}