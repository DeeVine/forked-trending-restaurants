import React, { Component } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
=======
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
>>>>>>> a18336744b28abfba12204d41caaa989ddad6690




<<<<<<< HEAD
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
=======
const App = () =>
  <Router>
    <div> 
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  </Router>;

export default App;
>>>>>>> a18336744b28abfba12204d41caaa989ddad6690
