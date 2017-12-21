import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api/restaurants')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <Router>
      <div>
      <Navbar />
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
        </div>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
