import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.png"
import Home from "./pages/Home";
import findRestaurant from "./pages/findRestaurant";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './sidebar_content';
import Footer from "./components/Footer";

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    position: 'absolute',
    paddingBottom : '100px',
    minHeight : '100vh',
    width: '100%',
    overFlowY: 'scroll',
  },
  logo: {
  	width: '50%',
  	display: 'block',
    margin: '0 auto',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
    };

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);

  }
 

  onSetOpen(docked) {
    this.setState({docked: docked});
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.docked);
  }

  renderPropCheckbox(prop) {
    const toggleMethod = (ev) => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <input type="checkbox" onChange={toggleMethod} checked={this.state[prop]} id={prop} />
        <label htmlFor={prop}> {prop}</label>
      </p>);
  }

  renderPropNumber(prop) {
    const setMethod = (ev) => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
         {prop} <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>);
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.open &&
         <a onClick={this.menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>=</a>}
        <span> <img src={logo} className="logo_page" alt="logo_page" style={styles.logo}/> </span>
      </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    return (
      <div>
            <Router>
	      <Sidebar {...sidebarProps}>
	        <MaterialTitlePanel title={contentHeader}>
	          	<div className ='content' style={styles.content}>
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/findRestaurant" component={findRestaurant} />
                         <Footer />
            </div>           
	        </MaterialTitlePanel>
  
	      </Sidebar>
        
	    </Router>
      </div>
    );
  }
}

export default App;
