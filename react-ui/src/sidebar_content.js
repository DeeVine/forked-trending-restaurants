import React from 'react';
import { Link } from "react-router-dom";
import MaterialTitlePanel from './material_title_panel';
import PropTypes from 'prop-types';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
  sidebarContainer: {
    width: '100%',
    marginBottom: '2px',
    padding: '10px',
  },
};

const SidebarContent = (props) => {
  const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

  const links = [];
  let number  = 0
  for (var i = 0; i < 10; i++) {
    number = (number + 1)
    links.push(
      <div className="sidebarContainer" style={styles.sidebarContainer}>
        <p>
          <p className="topTenTitle" >
            Restaurant {number}
          </p>
          <img alt="sidebarImage" src="https://assets.bonappetit.com/photos/57ae0a63f1c801a1038bcf18/16:9/w_1000,c_limit/texas-style-smoked-brisket.jpg"  style={styles.sidebarImage} />
        </p>
      </div>
    )
  }
  

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <img alt='profile pic' src='https://media1.popsugar-assets.com/files/thumbor/DDLEMrJEXIVZE1yEqjgGkaV4A_o/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/11/20/331/n/38922823/tmp_K8R88E_9dbe2b2dc2476118_food.jpg' style={styles.image}/>
        <a href="/Home" style={styles.sidebarLink}>Home</a>
        <a href="/findRestaurant" style={styles.sidebarLink}>Find A Restaurant</a>
        <a href="/Login" style={styles.sidebarLink}>Login</a>
        <div style={styles.divider} />
        <h2>
          Top 10 Restaurant
        </h2>
        {links}
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
