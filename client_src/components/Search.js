import React, { Component } from 'react';
import api from '../api';

import config from '../config';

import styles from './Search.css';
import FA from 'react-fontawesome';

import { Track, Artist, Album } from '../models/Collection';

import { 
  ResultsTab, AlbumTab, ArtistTab, TrackTab, 
  MoreTab, BackTab, LoadingTab,
} from './Tabs.js';



export default class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: null,
      timeout: null,
      pending: false,
      query: '',
      data: null
    }
  }

  clear(){
    console.log('cleared');
    this.setState({
      data: null,
      error: null,
      query: '',
    })
  }

  handleQuery(e){
    if(this.state.timeout){
      clearTimeout(this.state.timeout);
    }
    
    const query = e.target.value;

    if(query){
      const timeout = window.setTimeout(() => {
        this.search();
      }, config.searchDelay)
  
      this.setState({
        query: query,
        timeout: timeout,
      })
    }else{
      this.clear();
    }
  }

  search(){
    this.props.asyncCreator(
      api.spotify.search({ query: this.state.query }),
      {
        pending: () => this.setState({ pending: true }), 
        response: (data) => this.setState({
          pending: false,
          data: data.payload,
          error: data.error
        })
      }
    )
  }

  render(){
    const { data, pending, query } = this.state;
    return(
      <div className={styles.search}>
        <SearchBar
          query={query}
          handleQuery={(e) => this.handleQuery(e)}
          clear={() => this.clear()}
        />
        {data &&
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
  const { query, handleQuery, clear } = props;
  return(
    <div className={styles.searchBar}>
      <FA name='fas fa-search' className={styles.searchIcon} size='lg'/>
      <div className={styles.searchInput}>
        <input 
          placeholder={'Search'}
          value={query}
          onChange={(e) => handleQuery(e)}
        />
      </div>
      {query && 
        <FA 
          name={'fas fa-times'} 
          onClick={clear} 
          className={styles.clearIcon}
        />
      }
    </div>
  )
}

const typesData = [
  [
    'tracks', {
      name : "Tracks",
      tab: TrackTab,
  }],[
    'artists', {
      name : "Artists",
      tab : ArtistTab
  }],[
    'albums', {
      name : "Albums",
      tab : AlbumTab
    }
  ]
]

const list = [
  Object.assign(new Track(), { tab : TrackTab }),
  Object.assign(new Artist(), { tab : ArtistTab }),
  Object.assign(new Album(), { tab : AlbumTab })
]

class DropDown extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeSubtype : null
    }
  }

  setActive(subtype){
    this.setState({
      activeSubtype : subtype 
    })
  }

  render(){
    const { pending } = this.props;
    if(pending){
      return (
        <div className={styles.dropDown}>
          <LoadingTab />
        </div>
      )
    }else{
      const data = this.props.data;
      const { activeSubtype } = this.state;
      if(activeSubtype){
        const activeCollection = list.find(
          (collection) => (collection.type + 's') === activeSubtype
        )
        return(
          <div className={styles.dropDown}>
            <BackTab 
              back={() => this.setActive(null)} 
            />
            <TypeDisplay
              collection={activeCollection}
              data={data[activeCollection.type + 's']}
            />
          </div>
        )
      }else{
        const limit = 3;
        return(
          <div className={styles.dropDown}>
            {list.map((collection, index) => {
              const type = collection.type + 's';
              const length = data[type].items.length;
              const isLast = index + 1 === list.length;
              return(
                <div key={index}>
                  <ResultsTab length={length} collection={collection}/>
                  <TypeDisplay
                    collection={collection}
                    data={data[type]}
                    limit={limit}
                  /> 
                  {length > limit && 
                    <MoreTab 
                      name={collection.name} 
                      setActive={() => this.setActive(type)}
                    />
                  }
                  {
                     !isLast && <hr />
                  }
                </div>
              )
            })}
          </div>
        )
      }
    }
  }
}

const TypeDisplay = (props) => {
  const { collection, data, limit } = props;
  const Tab = collection.tab;
  const limitedItems = limit ? data.items.slice(0, limit) : data.items;

  return (
    <div>
      {
        limitedItems.map((itemData, index) => {
          return(
            <div key={index}>
              {React.createElement(Tab, { 
                data: itemData,
              })}
            </div>
          )
        })
      }
    </div>
  )
}