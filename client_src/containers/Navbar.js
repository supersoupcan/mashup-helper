import React, { Component } from 'react';
import styles from './Navbar.css';

class Navbar extends Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div className={styles.outer}>
        <div className={styles.tab}>
          Mashup Helper
        </div>
        <div className={styles.tab}>
          {this.props.auth.session ? 
            <a href='/auth/logout'>
              <button>Sign Out of Spotify</button>
            </a> 
            :
            <a href='/auth/login'>
              <button>Sign In to Spotify</button>
            </a>
          }
        </div>
      </div>
    )
  }
}

export default Navbar;