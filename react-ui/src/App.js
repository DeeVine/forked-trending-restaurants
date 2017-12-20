import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";




const App = () =>
  <Router>
    <div> 
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  </Router>;

export default App;