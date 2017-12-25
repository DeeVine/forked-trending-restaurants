import React, {Component} from 'react';
import { Input, Form, Searchbtn } from "../../components/Form";
import { Searched, Searcheditems } from "../../components/Searched";
import API from "../../utils/API.js";
import "./findRestaurant.css";

//Need to pass value from input field

class findRestaurant extends Component {

	state = {
		restaurantArr: [],
		restaurantName: "Homeroom",
		restaurantInfo: {}
	};

	componentDidMount() {
    	API.testQuery(this.state.restaurantName)
			.then(res => {
				this.setState({
					restaurantInfo: res.data
				})
				console.log(res);
				console.log(this.state);
			})
			.catch(err => console.log(err));
  	}

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
				this.setState({
					restaurantInfo: res.data
				})
				console.log(res);
				console.log(this.state);
			})
			.catch(err => console.log(err));
		}
	};

	render() {
		return (
		<div>
			<h1>
				Find A Restaurant
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

            {this.state.restaurantInfo.length ? (
              <Searched>
                {this.state.restaurantInfo.map(restaurant => (
                  <Searcheditems key={restaurant._id}>              
					<p> Name of Restaurant: {restaurant.name} </p>
					<p> Address: {restaurant.location.address}, {restaurant.location.city}, {restaurant.location.state} </p>
					<p> Data Summary: 
						<ul>
							<li>Yelp Rating: {restaurant.rating[0].rating} </li>
							<li>Yelp URL: {restaurant.yelpURL} </li>
						</ul>
					</p>
                  </Searcheditems>
                ))}
              </Searched>
            ) : (
              <h3>No Results to Display</h3>
            )}

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