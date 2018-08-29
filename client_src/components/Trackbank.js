import React, { Component } from 'react';

import ClassicalModel from '../models/Classical.model';
import CamelotModel from '../models/Camelot.model';

import { KeyFilters, TempoFilters } from '../models/Filters.model';

import FA from 'react-fontawesome';

import styles from './Trackbank.css';

export default class Trackbank extends Component{
  constructor(){
    super();
  }

  render(){
    
    const { 
      trackbank, activeTempo, filterTempo, 
      filterKey, activeKey, cb 
    } = this.props;
    const trackbankTest = trackbank.map((track, index) => {
      const tempoTest = TempoFilters[filterTempo].test(activeTempo, track);
      const keyTest = KeyFilters[filterKey].test(activeKey, track);
      return Object.assign({}, track, { tempoTest, keyTest })
    })
    const trackbankFiltered = trackbankTest.filter((track) => track.tempoTest.success && track.keyTest.success);

    return(
      <div className={styles.container} >
        <Legend />
        {
          trackbankFiltered.map((track, index) => {
            const isEnd = (index === trackbankFiltered.length - 1)
            return(
              <Track 
                cb={cb}
                key={index} 
                data={track}
                isEnd={isEnd}
                remove={(id) => this.props.dispatch({
                  type: "REMOVE_TRACK",
                  payload: { id }
              })}/>
            )
          })
        }
      </div>
    )
  }
}

const Legend = (props) => {
  return(
    <div className={styles.legend}>
      <div className={styles.legendImageBreak}></div>
      <div className={styles.legendAlign}>
        <div className={styles.legendTrack}>Track</div>
        <div className={styles.legendTime}>Time</div>
        <div className={styles.legendKey}>Key</div>
        <div className={styles.legendTempo}>Tempo</div>
        <div className={styles.legendButtons}></div>
      </div>
    </div>
  )
}

const Track = (props) => {
  const { data, remove, isEnd, cb } = props;
  const { artists, name, durationMs, audioFeats, album, id, tempoTest } = data;

  const { image } = album;
  const artistsStr = artists.map((artist) => artist.name).join(' - ');
  
  let seconds = ((durationMs/1000)%60).toFixed(0);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  let minutes = ((durationMs /(1000*60))%60).toFixed(0);

  const classicalKey = ClassicalModel.find(audioFeats.keyIndex);
  const camelotKey = CamelotModel.keys[audioFeats.keyIndex];

  return(
    <div 
      className={isEnd ? styles.trackEnd : styles.track } 
      style={{'backgroundColor': '#' + camelotKey.color}}>
      <img 
          className={styles.image} src={image.url}
        />
      <div className={styles.content}>
        <div className={styles.labels}>
          <div className={styles.name}>{name}</div>
          <div className={styles.artist}>{artistsStr}</div>
        </div>
        <div className={styles.duration}>{minutes + ':' + seconds}</div>
        <div className={styles.key}>
          <div 
            title={camelotKey.name} 
            onClick={() => cb(audioFeats.keyIndex, 'activeKey')}
          >
            {classicalKey.note.name + classicalKey.mode.symbol}
          </div>
        </div>
        <div className={styles.tempo}> 
          <span 
            className={styles.bpm} 
            title={audioFeats.tempo + " BPM"}
            onClick={() => cb(Math.round(audioFeats.tempo), 'activeTempo')}
          >
            { tempoTest.name + Math.round(audioFeats.tempo)}
          </span>
          <span className={styles.bpmWord}>{' BPM'}</span>
        </div>
        <div className={styles.buttons}>
          <FA name={'fab fa-trash'} onClick={() => remove(id)} />
        </div>
      </div>
    </div>
  )
}