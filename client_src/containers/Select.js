import React, { Component } from 'react';

import config from '../config';

import Search from '../components/Search';
import searchData from '../test/searchData';
import Trackbank from '../components/Trackbank';
import Filters from '../components/Filters';


import styles from './Select.css';
import FA from 'react-fontawesome';

export default class Select extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeKey: 0,
      filterKey: 3,
      activeTempo: 120,
      filterTempo: 5 
    }
  }

  onChangeHandler(value, key){
    this.setState({
      [key]: value
    })
  }

  render(){
    return(
      <div className={styles.container}>
        <div className={styles.tools}>
          <div className={styles.add}>
            {this.props.auth.session ?
              <Search 
                asyncCreator={this.props.asyncCreator}
                dispatch={this.props.dispatch}
                testData={searchData}
              /> : 
              <div className={styles.signIn}> 
                <a href='auth/login'> Sign In</a> 
                {' to add tracks from Spotify'}
              </div>
            }
              <div className={styles.signIn}>
                {'Add Tracks Manually'}
              </div>
          </div>
          <div className={styles.filters}>
            <Filters 
              cb={(value, key) => this.onChangeHandler(value, key)}
              activeKey={this.state.activeKey}
              filterKey={this.state.filterKey}
              activeTempo={this.state.activeTempo}
              filterTempo={this.state.filterTempo}
            />
          </div>
        </div>

        <Trackbank
          cb={(value, key) => this.onChangeHandler(value, key)}
          activeKey={this.state.activeKey}
          filterKey={this.state.filterKey}
          activeTempo={this.state.activeTempo}
          filterTempo={this.state.filterTempo}
          trackbank={this.props.trackbank}
          dispatch={this.props.dispatch}
        />
      </div>
    )
  }
}