import React, { Component } from 'react';

import config from '../config';
import api from '../api';

import Checkbox from '../components/Checkbox';

import styles from './Select.css';
import FA from 'react-fontawesome';


export default class Select extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={styles.container}>
        {this.props.auth.session ? 
          <Search 
            asyncCreator={this.props.asyncCreator} 
          />
          :
          <div>
            <a href='auth/login'>
              Sign In
            </a> 
            {' to add tracks from Spotify'}
          </div>
      }
        <div>TODO: Add Manually</div>
      </div>
    )
  }
}

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: null,
      type: 'track',
      timeout: null,
      pending: false,
      query: '',
      data: {
        offset: 0,
        collections: [],
        total: 0
      }
    }
  }

  handleType(e){
    this.setState({
      type: e.target.value
    })
  }

  handleQuery(e){
    if(this.state.timeout){
      clearTimeout(this.state.timeout);
    }

    const timeout = window.setTimeout(() => {
      this.search();
    }, config.searchDelay)

    this.setState({
      timeout: timeout,
      query: e.target.value
    })
  }

  search(nextOffset = 0){
    function pending(){
      this.setState({
        pending: true 
      });
    }

    function resolve(data){
      const { items, offset, total } = data;
      this.setState({
        pending: false,
        data : {
          collections: items,
          offset: offset,
          total: total
        }
      });
    }

    function reject(error){
      console.log(error);
      this.setState({ 
        pending: false,
        error: error,
      });
    }

    this.props.asyncCreator(
      api.spotify.search({
        query: this.state.query,
        offset: this.state.offset + nextOffset,
        type: this.state.type,
      }),
      { pending: pending.bind(this), 
        resolve: resolve.bind(this),
        reject: reject.bind(this)
      }
    )
  }

  render(){
    const { data, pending, query, type } = this.state;
    return(
      <div className={styles.search}>
        <SearchBar
          query={query}
          handleQuery={(e) => this.handleQuery(e)}
          type={type}
          handleType={(e) => this.handleType(e)}
        />
        { query &&
          <DropDown 
            data={data}
            pending={pending}
          />
        }
      </div>
    )
  }
}

const SearchBar = (props) => {
  const { type, handleType, query, handleQuery } = props;
  return(
    <div>
    <div className={styles.searchType}>
        <select 
          value={type} 
          onChange={(e) => handleType(e)}
        >
          <option value={'track'}>Tracks</option>
          <option value={'album'}>Albums</option>
          <option value={'artist'}>Artists</option>
          <option value={'playlist'}>Playlists</option>
        </select>
      </div>
      <div className={styles.searchBar}>
        <FA name='fas fa-search' className={styles.searchIcon} size='1.5x'/>
        <div className={styles.searchInput}>
          <input 
            placeholder={'Search'}
            value={query}
            onChange={(e) => handleQuery(e)}
          />
        </div>
      </div>
    </div>
  )
}

const DropDown = (props) => {
  const {data, pending} = props;
  if(pending){
    return (
      <div className={styles.dropDown}>
        <PendingTab />
      </div>
    )
  }else{
    return(
      <div className={styles.dropDown}>
      <StartTab data={data}/>
        {data.collections.map((collection, index) => {
          return(
            <Tab data={collection} key={index} />
          )
        })}
        {data.total > 0 &&
          <EndTab data={data}/>
        }
      </div>
    )
  }
}

const Tab = (props) => {
  const { data } = props;
  switch(data.type){
    case 'track' : {
      return (
        <div className={styles.tab}>
          <div>
            {data.name}
          </div>
          <div>
            {data.artists[0].name}
          </div>
          <AddToCollections />
        </div>
      )
    }
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

const StartTab = (props) => {
  const { data } = props;
  return(
    <div className={styles.startTab}>
      <div className={styles.tabHeading1}>
        { data.total + ' Results' } 
      </div>
    </div>
  )
}

const EndTab = (props) => {
  const { collections, offset } = props.data;
  const start = offset + 1;
  const end = start + collections.length - 1;
  return(
    <div className={styles.endTab}>
      <FA 
        name={'fas fa-arrow-left'}
      />
      <div>
        {start + '-' + end}
      </div>
      <FA 
        name={'fas fa-arrow-right'}
      />
    </div>
  )
}

const PendingTab = (props) => (
  <div className={styles.pendingTab}>
    <div className={styles.loading}>
      Loading
    </div>
  </div>
)