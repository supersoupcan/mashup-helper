import React, { Component } from 'react';

import Checkbox from '../components/Checkbox';
import api from '../api';

export default class Select extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <Search 
          asyncCreator={this.props.asyncCreator} 
        />
      </div>
    )
  }
}

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      error : null,
      timeout : null,
      pending : false,
      query : '',
      typeFilters : {
        track : true,
        album : true,
        artist : true,
        playlist : true,
      },
      next : 0,
      results : []
    }
  }

  toggleTypeFilter(e){
    const nextTypeFilters = Object.assign(
      {}, this.state.typeFilters,
      {[e.target.name] : !this.state.typeFilters[e.target.name]}
    )

    const checkForSingleType = !Object.keys(nextTypeFilters).every(
      (typeFilter) => !nextTypeFilters[typeFilter]
    );

    if(checkForSingleType){
      this.setState({typeFilters : nextTypeFilters});
    }
  }

  handleInput(e){
    if(this.state.timeout){
      clearTimeout(this.state.timeout);
    }

    const timeout = window.setTimeout(() => {
      this.search();
    }, 200)

    this.setState({
      timeout : timeout,
      query : e.target.value
    })
  }

  search(){
    function pending(){
      this.setState({ pending : true });
    }

    function resolve(data){

      this.setState({ pending : false });
    }

    function reject(error){
      console.log(error);
      this.setState({ 
        pending : false,
        error : error
      });
    }

    
    this.props.asyncCreator(
      api.spotify.search({
        query : this.state.query,
        next : this.state.next,
        type : Object.keys(this.state.typeFilters).filter(
          (typeFilter) => this.state.typeFilters[typeFilter]
        )
      }),
      { pending : pending.bind(this), 
        resolve : resolve.bind(this),
        reject : reject.bind(this)
      }
    )
  }

  render(){
    return(
      <div>
        <TypeFilters 
          onToggle={(e) => this.toggleTypeFilter(e)}
          state={this.state.typeFilters}
        />
        <SearchBar
          query={this.state.query}
          handleInput={(e) => this.handleInput(e)}
        />
        <DropDown 
        
        />
      </div>
    )
  }
}

const DropDown = (props) => {
  return(
    <div> </div>
  )
}

const SearchBar = (props) => {
  const { query, handleInput } = props;
  return(
    <div>
      <input 
        placeholder={'Search'}
        value={query}
        onChange={(e) => handleInput(e)}
      />
    </div>
  )
}

const TypeFilters = (props) => {
  const { state, onToggle } = props;
  return(
    <div>
      <Checkbox 
        label='Tracks'
        name='track'
        value={state.track} 
        onToggle={onToggle}
      />
      <Checkbox 
        label='Albums'
        name='album'
        value={state.album}
        onToggle={onToggle}
      />
      <Checkbox 
        label='Artists'
        name='artist'
        value={state.artist}
        onToggle={onToggle} 
      />
      <Checkbox 
        label='Playlists'
        name='playlist'
        value={state.playlist}
        onToggle={onToggle} 
      />
    </div>
  )
}