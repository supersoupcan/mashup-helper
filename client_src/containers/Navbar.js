import React, { Component } from 'react';
import styles from './Navbar.css';

import FA from 'react-fontawesome';

import { NavLink } from 'react-router-dom';

class Navbar extends Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.groupLeft}>
            <NavLink to='/' className={styles.home} exact>
              Mashup Helper
            </NavLink>
            <NavLink
              to='/select'
              className={styles.route} 
              activeClassName={styles.activeRoute}>
              Track Bank
            </NavLink>
            <div className={styles.route}>
              Organize
            </div>
          </div>
          <div className={styles.groupRight}>
            <span className={styles.authentication}>
              <FA 
                name='fab fa-spotify'
                size='2x'
                className={styles.spotifyIcon}
                style={{color : '#1DB954'}}
              />
              {this.props.auth.session ? 
                <a href='/auth/logout'>
                  Sign Out
                </a> 
                :
                <a href='/auth/login'>
                  Sign In
                </a>
              }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;