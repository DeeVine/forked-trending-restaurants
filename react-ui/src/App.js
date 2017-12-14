import React, { Component } from 'react';
import Home from "./pages/Home";

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
      <div>
        <header>
          <h1>Home Page</h1>
        </header>
        <Home />

        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>

      </div>
    );
  }
}

export default App;
