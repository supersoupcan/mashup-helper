import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Home extends Component{
  constructor(props){
    super();
  }
  render(){
    if(this.props.auth.session){
      return(<Redirect to='/select'/> )
    }else{
      return(
        <Message />
      )
    }
  }
}


const Message = (props) => {
  return(
    <div>
      <div>
        This websites lets you assemble tracks using Spotify Webservices
        and sort/filter the assembled tracks by tempo and key, 
        allowing one to quickly figure out songs could be mashed to pleasent effect.
      </div>
      <div>
        This website uses Spotify webservices, so you must be signed in to a Spotify account to use it.
        No need to worry. No information is recorded on my end.
      </div>
      <div>
        I do hope this website helps inspire weird soundcloud madness. Enjoy!
      </div>
    </div>
  )
}