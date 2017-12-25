import React, {Component} from 'react';
import { Input, Form, Searchbtn } from "../../components/Form";
import API from "../../utils/API.js";
import "./findRestaurant.css";

//Need to pass value from input field

class findRestaurant extends Component {

	state = {
		restaurantArr: [],
		restaurantName: "Homeroom"
	};

	loadRestaurants = () => {
    	API.AllReviews()
    	.then(res => {
			console.log(res)
    	})
    	.catch(err => console.log(err));
    };

    testQuery = name => {
    	API.testQuery(name)
    	.then(res => {
			console.log(res)
    	})
    	.catch(err => console.log(err));
    };

    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
		console.log(this.state.restaurantName);
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.restaurantName) {
			API.testQuery(this.state.restaurantName)
			.then(res => {
				console.log(res)
			})
			.catch(err => console.log(err));
		}
	};

	render() {
		return (
		<div>
			<h1>
				Home Home Home
			</h1>
			<form>
              <Input
                value={this.state.restaurantName}
                onChange={this.handleInputChange}
                name="restaurantName"
                placeholder="restaurant"
              />
              <Searchbtn
                disabled={!(this.state.restaurantName)}
                onClick={this.handleFormSubmit}
              >
               Search Restaurant
              </Searchbtn>
            </form>

			<button onClick={this.loadRestaurants}>
				load restaurants
			</button>

			<button onClick={() => this.getAPIData()}>
				button
			</button>
			<button onClick={this.yelppy}>
				Yelp Button
			</button>
		</div>

		)
	}
}

export default findRestaurant;