import React, {Component} from 'react';
import { Input, Form, Searchbtn } from "../../components/Form";
import { Searched, Searcheditems } from "../../components/Searched";
import Chart from "../../components/Chart";
import API from "../../utils/API.js";
import "./findRestaurant.css";

//Need to pass value from input field

class findRestaurant extends Component {

	constructor () {
		super();
		this.state = { 
			chartData: {},
			restaurantArr: [],
			restaurantName: "Homeroom",
			restaurantInfo: {}	
		}
	}

	//happens before initial render
	componentWillMount () {
		// this.getChartData();
	};

	//generate chartData for Chart component
	getChartData = (labels, data, rating_count) => {
		this.setState({
			chartData: {
				labels: labels,
				datasets: [
					{
						label: 'rating',
						data: data,
						backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ]
					}
				]
			}
		}, () => {
			console.log(this.state);
		})
	};

	componentDidMount() {
		// this.getChartData();
    	API.AllReviews()
			.then(res => {

				console.log(res.data[0].rating_count[0].query_date);

				let queryDate = res.data[0].rating_count[0].query_date
				queryDate = queryDate.replace(/ .*/,'');
				console.log(queryDate);
				 
				let rating_count = res.data[0].rating_count;
				const data = rating_count.map(rating => {
					return rating.rating_count
				})

				console.log(rating_count)

				const labels = rating_count.map(rating => {
					queryDate = rating.query_date.replace(/ .*/,'');
					return queryDate;
				})

				console.log(labels);

				this.setState({
					restaurantInfo: res.data,
					ratingArray: rating_count
				})
				console.log(res);
				console.log(this.state);
				console.log(this.state.restaurantInfo[0].rating_count)
				
				// console.log(ratingArray);

				//generate chart data from res
				this.getChartData(labels, data);

			})
			.catch(err => console.log(err));
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
			<form className='restaurantSearch'>
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

            <form className="restaurantChart">
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

            <button onClick={this.getChartData}>
				Get Chart Data
			</button>

            <Chart chartData={this.state.chartData} restaurantName={'Set this in props'} legendPosition="top"/>

            <section className="section">
			    <div className="container">
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
			    </div>
			</section>
            

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