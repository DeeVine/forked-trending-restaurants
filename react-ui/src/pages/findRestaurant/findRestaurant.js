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

	componentDidMount() {
    	API.AllReviews()
			.then(res => {
				console.log(res);
				console.log(res.data);
				this.setState({
					restaurantInfo: res.data
				})
				this.generateChartData(this.state.restaurantInfo);
				console.log(this.state);
			})
			.catch(err => console.log(err));
  	};

  	//create labels and data arrays and sets chartData state
	generateChartData = (res) => {
		const rating_count = res[0].rating_count;		
		const labels = rating_count.map(rating => {
			let queryDate = rating.query_date.replace(/ .*/,'');
			return queryDate;
		})		
		const data = rating_count.map(rating => {
			return rating.rating_count
		})

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

    //update state whenever field input changes
    handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
		console.log(this.state.restaurantName);
	};

	searchRestaurant = event => {
		event.preventDefault();
		if (this.state.restaurantName) {
			API.testQuery(this.state.restaurantName)
			.then(res => {
				this.setState({
					restaurantInfo: res.data
				})
				console.log(res);
				console.log(this.state);
				this.generateChartData(this.state.restaurantInfo)
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
                onClick={this.searchRestaurant}
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
                onClick={this.searchRestaurant}
              >
               Search Restaurant
              </Searchbtn>
            </form>

            <button onClick={() => this.generateChartData(this.state.restaurantInfo) }>
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