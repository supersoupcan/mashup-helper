import React, { Component } from 'react';

import config from '../config';

import Search from '../components/Search';
import searchData from '../test/searchData';

import styles from './Select.css';
import FA from 'react-fontawesome';




export default class Select extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={styles.container}>
        <div className={styles.add}>
          {this.props.auth.session ? 
            <Search 
              asyncCreator={this.props.asyncCreator}
              testData={searchData}
            />
            :
            <div>
              <a href='auth/login'>
                Sign In
              </a> 
              {' to add tracks from Spotify'}
            </div>
          }
        </div>
        <div className={styles.trackbank}>

        </div>
      </div>
    )
  }
}


const AddToCollections = (props) => {
  return(
    <div>
      <FA 
        name='fas fa-plus-square'
      />
    </div>
  )
}