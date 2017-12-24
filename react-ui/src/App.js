import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Main from "./components/Main";


const App = () =>
  <Router>
    <div> 
    <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Main" component={Main} />
      <Footer />
    </div>
  </Router>;

export default App;
