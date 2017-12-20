import React, {Component} from 'react';
import API from "../../utils/apis";
import Arrays from './arrays.json';
import moment from 'moment';
import {Search, SearchField} from '../../components/Search';
import {SearchResults} from '../../components/SearchResults';

class Home extends Component {

	state = {
		restaurantArr: [],
		showMe: false,
		search: "",
		searchResult: []
	};

	loadRestaurants = () => {
    	API.AllReviews()
    	.then(res => {
			// console.log(res)
			let dataArray = res;
			console.log(dataArray);
			let reviews = res.data[0].reviews;
			let date = res.data[0].reviews[0].query_date;
			console.log(date);
			console.log(reviews);
			// console.log(moment(date).format('LL'));
			let firstdate = date.replace(/ .*/,''); //extract date from timestamp
			console.log('firstdate: ' + firstdate);
			console.log('res.data.length: ' + res.data.length)
			const dateArray = res.data;
			console.log(dateArray);

			let comparisonDate = dateArray[0].reviews[0].query_date //date of first array item to compare against
			// const sortedArray = [dateArray[0].reviews[0].review_count]; //create array with initial value
			console.log(sortedArray);

			const sortedArray = [];
			var inner = [];

			for (var i = 0; i < dateArray.length; i++) {
				let querydate = dateArray[i].reviews[0].query_date;
				if (comparisonDate === querydate){
					inner.push(dateArray[i].reviews[0].review_count); //push review count into array
				} else {
					sortedArray.push(inner);
					inner = [dateArray[i].reviews[0].review_count];
				}
				comparisonDate = querydate;
				//if last array item, push inner array into sortedArray;
				if(i === dateArray.length-1){
					sortedArray.push(inner);
				}
			}
			console.log(sortedArray);
    	})
    	.catch(err => console.log(err));
    };

  testQuery = () => {
  	API.testQuery()
  	.then(res => {
		console.log(res)
  	})
  	.catch(err => console.log(err));
  };

  changeShowMeState = () => {
  	console.log('click')
  	this.setState({
  		showMe: true
  	})
  	console.log(this.state.showMe)
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitButton = (event) => {
  	event.preventDefault();
  	if (this.state.search) {
  		console.log('search: ', this.state.search)
  		let query = this.state.search
  		API.restaurantQuery(query)
  			.then(res => this.handleSearchResponse(res))
  			.catch(err => console.log(err))
  	}
  };

  handleSearchResponse = (res) => {
  	if (res) {
  		this.setState({
  			searchResult: res
  		})
  	}
  	else {
  		console.log('no results found')
  	}
  };

	render() {
		return (
			<div>
				<h1>
					Home Home Home
				</h1>
				<button onClick={this.loadRestaurants}>
					load restaurants
				</button>
				<button onClick={this.testQuery}>
					load test query
				</button>

				<button
					onClick={() => this.getAPIData()}
				>
				button
				</button>
				<button onClick={this.yelppy}>
					Yelp Button
				</button>
				<div className="wrapper">
		<header>
		  <nav className="nav level">
		  	<div className="level-left">
		  		<p className="logo">Trending Restaurants</p>
		  	</div>

		  	<div className="level-right">
		  		{this.state.showMe ? 
		  			<SearchField 
		  				handleInputChange={this.handleInputChange}
		  				handleSubmitButton={this.handleSubmitButton}
		  				searchState={this.state.search}
		  			/> :
		  			<Search 
							changeShowMeState= {this.changeShowMeState}
						/>
		  		}
					<a href="#" className="navLinks button is-link">Login</a>
		    </div>

		  </nav>
		</header>
		{this.state.searchResults ?
			null :
			<SearchResults />
		}
		<div className="main container-fluid">
			<h1>Main Content Goes Here</h1>
			<p>The content</p>
			<div className="card restaurant-list">
			  <header className="card-header">
			    <p className="card-header-title is-centered">
			      Top Trending Restaurants
			    </p>
			    <a href="#" className="card-header-icon" aria-label="more options">   
			    </a>
			  </header>
			  <div className="card-content">
			    <div className="content list">
			      <ul className='centered'>
			      	<li>1. Restaurant 1</li>
			      	<li>2. Restaurant 2</li>
			      	<li>3. Restaurant 3</li>
			      	<li>4. Restaurant 4</li>
			      	<li>5. Restaurant 5</li>
			      </ul>
			    </div>
			  </div>
			</div>
			<div className="card restaurant-list">
			  <header className="card-header">
			    <p className="card-header-title is-centered">
			      Review Percentages
			    </p>
			    <a href="#" className="card-header-icon" aria-label="more options">   
			    </a>
			  </header>
			  <div className="card-content">
			    <div className="content list">
			      <ul className='centered'>
			      	<li>1. Restaurant 1</li>
			      	<li>2. Restaurant 2</li>
			      	<li>3. Restaurant 3</li>
			      	<li>4. Restaurant 4</li>
			      	<li>5. Restaurant 5</li>
			      </ul>
			    </div>
			  </div>
			</div>		
		</div>
	</div>	
	<footer className="footer">
		<p className="centered">Copyright &#169; 2017 | Trending Restaurants</p>
	</footer>	
			</div>

		)
	}
}

export default Home;