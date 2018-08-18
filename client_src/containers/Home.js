import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styles from './Home.css';

export default class Home extends Component{
  constructor(props){
    super();
  }
  render(){
    return(
      <div className={styles.container}>
      <p>
        This websites lets you sort and filter a collection of tracks by tempo and key.
        Track data can be added manually, or pulled from Spotify Webservices. 
        As you can imagine, this makes it easy to find inspiration for your next Weird SoundCloud mashup.
      </p>
      <p>
        To use Spotify Webservices, you must authenticate through Spotify.
        Don't worry. No data is stored on my end.
      </p>
      <p>
        I hope you will find this website helpful. Enjoy!
      </p>
    </div>
    )
  }
}