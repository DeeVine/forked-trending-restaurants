import "./Main.css";
import React, { Component } from "react";
import API from "../../utils/API";
import {Delete} from "../../components/Delete";
import {Searchbtn, Input, Form} from "../../components/Form";
import {Saved, Savebtn, Saveditems} from "../../components/Saved";
import {Searched, Searcheditems} from "../../components/Searched";
import axios from "axios";

class Main extends Component {

	state = {
		topic: "food",
		begindate: "20171201",
		enddate:"20171205",
		articles: [],
		savedarticles: [],
	};

	componentDidMount() {
    	this.getArticles();
    	this.loadArticles();
  	}
  	
  	getArticles = () => {
  		let self = this;
	    axios({
	      url:'https://api.nytimes.com/svc/search/v2/articlesearch.json',
	      params:{ 'api-key': "7ca74794a0a64d579de04b287793ce32",
	            'q': this.state.topic,
	            'begin_date': this.state.begindate,
	            'end_date': this.state.enddate}
	    })
	      .then(function(response) {	
	      // console.log(response);
	      console.log(response.data.response.docs);
	      self.setState({articles: response.data.response.docs})
	    });
	};

	loadArticles = () => {
		API.getArticles()
		  .then(res =>
		    this.setState({ savedarticles: res.data, title: "", author: "", synopsis: "" }, function(){
		    	// console.log(this.state);
		    }),
		  )
		  .catch(err => console.log(err));
	};

	deleteArticle = id => {
		API.deleteArticle(id)
		  .then(res => this.loadArticles())
		  .catch(err => console.log(err));
	};

		// Handles updating component state when the user types into the input field
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
		  [name]: value
		});
	};

	saveArticle = (event, url) => {
		if (true) {
		  API.saveArticle({
		    headline: event,
		    url: url	
		  })
		    .then(res => this.loadArticles())
		    .catch(err => console.log(err));
		}
	};

  render() {
    return (
      <div className="App">
       	{console.log(this.state)}
       	<div className="main">
	       	<p className="main-header">New York Times Article Scrubber</p>
	       	<p className="sub-header">Search for and annotate articles of interest!</p>
       	</div>      	
       	<div className="wrapper">
       		<h1 className="section-header">Search</h1>
       		<Form>
       			<h5 className="input-header">Topic</h5>
	        	<Input
	                value={this.state.topic}
	                onChange={this.handleInputChange}
	                name="topic"
	                placeholder="Topic (required)"
	             />
	             <h5 className="input-header">Start Date</h5>
	             <Input
	                value={this.state.begindate}
	                onChange={this.handleInputChange}
	                name="begindate"
	                placeholder="Start Year (required)"
	              />
	              <h5 className="input-header">End Date</h5>
	              <Input
	                value={this.state.enddate}
	                onChange={this.handleInputChange}
	                name="enddate"
	                placeholder="End Year (required)"
	              />
	              <Searchbtn onClick={this.getArticles}>Search Articles</Searchbtn>
        	</Form>
       	</div>         
        <div className="wrapper">
        	<h1 className="section-header">Results</h1>
	        <Searched>
	   			{this.state.articles.map((article,i) =>  (
	       			<Searcheditems key={i}>
	       				<span>{article.headline.main}</span>
	       				<Savebtn value={article.headline.main} onClick={() => this.saveArticle(article.headline.main, article.web_url)}/>
	       			</Searcheditems>
	   			))}	
	        </Searched>
        </div>
        <div className="wrapper">
        	<h1 className="section-header">Saved Articles</h1>
	       	<Saved>
	       		{this.state.savedarticles.map((article,i) =>  (
	       			<Saveditems key={i}>
	       				<span>{article.headline}</span>
	       				<span>{article.date}</span>
	       				<Delete value={article.headline} onClick={() => this.deleteArticle(article._id)}/>
	       			</Saveditems>
	   			))}	
	       	</Saved>
       	</div>
      </div>
    );
  }
}

export default Main;