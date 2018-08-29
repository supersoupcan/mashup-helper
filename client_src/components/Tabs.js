import React from 'react';

import FA from 'react-fontawesome';
import styles from './Tabs.css';

import api from '../api';

const MoreTab = (props) => (
  <div className={styles.moreTab} onClick={props.setActive}>
    <div>
      {'More'}
      <FA 
        className={styles.moreIcon}
        name={'fas fa-arrow-right'}
      />
    </div>
  </div>
)

const BackTab = (props) => (
  <div className={styles.backTab} onClick={props.back}>
    <div>
      <FA 
        className={styles.backIcon}
        name={'fas fa-arrow-left'}
      />
      {'Back'}
    </div>
  </div>
)

const AddIcon = (props) => (
  <div onClick={props.add}>
    <FA name="fas fa-plus" size="2x" className={styles.add}/>
  </div>
)


const ResultsTab = (props) => {
  const { collection, length } = props;
  return(
    <div>
      <div className={styles.tab}>
        <div className={styles.typeName}>{collection.name + 's'}</div>
      </div>
      {length === 0 &&
        <div className={styles.tab}>
          <div className={styles.noResults}>{'No Results'}</div>
        </div>
      }
    </div>
  )
}

const TrackTab = (props) => {
  const { data, asyncCreator }  = props;
  const artists = data.artists.map((artist) => artist.name);
  const image = data.album.images[data.album.images.length - 1];


  function add(){
    asyncCreator(api.spotify.trackAudioFeat(data.id), {
      on: { resolve: "ADD_TRACK" },
      meta: { track: data }
    })
  }

  return (
    <div className={styles.tab}>
      <img 
        className={styles.image} 
        src={image ? image.url : null}
      />
      <div className={styles.labelTab}>
        <div className={styles.label}>{ data.name }</div>
        <div className={styles.subLabel}>{ artists.join(' - ') }</div>
      </div>
      <AddIcon add={add}/>
    </div>
  )
}

const ArtistTab = (props) => {
  const {data, add } =  props;
  const image = data.images[data.images.length - 1];
  return(
    <div className={styles.tab}>
      <img 
        className={styles.artistImage} 
        src={image ? image.url : null}
      />
      <div className={styles.labelTab}>
        <div className={styles.label}>{ data.name }</div>
      </div>
      <AddIcon add={add} />
    </div>
  )
}

const AlbumTab = (props) => {
  const { data, asyncCreator } = props;
  const image = data.images[data.images.length - 1];
  const artists = data.artists.map((artist) => artist.name);

  function add(){
    asyncCreator(api.spotify.albumTrackAudioFeats(data.id, data.total_tracks), {
      on: { resolve: 'ADD_TRACKS' },
      meta: { album : data }
    })
  }

  return (
    <div className={styles.tab}>
      <img
        className={styles.image}
        src={image ? image.url : null}
      />
      <div className={styles.labelTab}>
        <div className={styles.label}>{ data.name }</div>
        <div className={styles.subLabel}>{ artists.join (' - ') }</div>
      </div>
      <AddIcon add={add}/>
    </div>
  )
}

const LoadingTab = () => (
  <div className={styles.loading}>
    {'Loading'}
  </div>
)

export { ResultsTab, AlbumTab, ArtistTab, TrackTab, MoreTab, BackTab, LoadingTab }