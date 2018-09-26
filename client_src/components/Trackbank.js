import React, { Component } from 'react';

import ClassicalModel from '../models/Classical.model';
import CamelotModel from '../models/Camelot.model';

import { KeyFilters, TempoFilters } from '../models/Filters.model';

import FA from 'react-fontawesome';
import styles from './Trackbank.css';

const SortGroup = function(style, offMode, onModes){
  this.style = style;
  this.offMode = offMode;
  this.onModes = onModes;
}

const SortMode = function(text, icon, compareFunction){
  this.text = text;
  this.icon = icon;
  this.compareFunction = compareFunction;
}

const createCompare = function(getCompareItem, isReverse){
  return (a, b) => {;
    const aItem = getCompareItem(a);
    const bItem = getCompareItem(b);
    if(aItem > bItem) return isReverse ? -1 : 1;
    if(aItem < bItem) return isReverse ? 1 : -1;
    return 0;
  }
}

const legendSorting = [
  new SortGroup(
    styles.legendTrack,
    new SortMode("Track", null, null),
    [
      new SortMode(
        'Track:Name',
        'fab fa-sort-down',
        createCompare((item) => item.name.toLowerCase(), false)),
      new SortMode(
        'Track:Name',
        'fab fa-sort-up',
        createCompare((item) => item.name.toLowerCase(), true)),
      new SortMode(
        'Track:Artist',
        'fab fa-sort-down',
        createCompare((item) => item.artists[0].name.toLowerCase(), false)
      ),
      new SortMode(
        'Track:Artist',
        'fab fa-sort-up',
        createCompare((item) => item.artists[0].name.toLowerCase(), true)
      ),
    ]
  ),
  new SortGroup(
    styles.legendTime,
    new SortMode("Time", null, null),
    [
      new SortMode(
        'Time', 
        'fab fa-sort-down', 
        createCompare((item) => item.durationMs, false),
      ),
      new SortMode(
        'Time', 
        'fab fa-sort-up', 
        createCompare((item) => item.durationMs, true)
      ),
    ]
  ),
  new SortGroup(
    styles.legendKey,
    new SortMode("Key", null, null),
    [
      new SortMode(
        'Key',
        'fab fa-sort-down', 
        createCompare((item) => ClassicalModel.find(
          item.audioFeats.keyIndex).note.order, false
        ),
      ),
      new SortMode(
        'Key', 
        'fab fa-sort-up',
        createCompare((item) => ClassicalModel.find(
          item.audioFeats.keyIndex).note.order, true
        )
      ),
      new SortMode(
        'Key:Camelot',
        'fab fa-sort-down', 
        createCompare((item) => item.audioFeats.keyIndex, false),
      ),
      new SortMode(
        'Key:Camelot', 
        'fab fa-sort-up',
        createCompare((item) => item.audioFeats.keyIndex, true)
      )
    ]
  ),
  new SortGroup(
    styles.legendTempo,
    new SortMode("Tempo", null, null),
    [
      new SortMode(
        'Tempo', 
        'fab fa-sort-down', 
        createCompare((item) => item.audioFeats.tempo, false),
      ),
      new SortMode(
        'Tempo',
        'fab fa-sort-up', 
        createCompare((item) => item.audioFeats.tempo, true),
      )
    ]
  )
]

export default class Trackbank extends Component{
  constructor(){
    super();
    this.state = {
      sort: {
        group: 0,
        mode: 0
      }
    }
  }

  adjustSort(group){
    if(this.state.sort.group === group){
      this.setState({
        sort: { 
          group: group,
          mode: this.state.sort.mode + 1
        }
      })
    }else{
      this.setState({
        sort: {
          group: group,
          mode: 0
        }
      })
    } 
  }

  render(){
    const { 
      trackbank, activeTempo, filterTempo, 
      filterKey, activeKey, cb 
    } = this.props;
    const { group, mode } = this.state.sort;

    const trackbankTest = trackbank.map((track, index) => {
      const tempoTest = TempoFilters[filterTempo].test(activeTempo, track);
      const keyTest = KeyFilters[filterKey].test(activeKey, track);
      return Object.assign({}, track, { tempoTest, keyTest })
    })
    const trackbankFiltered = trackbankTest.filter(
      (track) => track.tempoTest.success && track.keyTest.success
    );

    const trackbankSorted = trackbankFiltered.sort(
      legendSorting[group].onModes[
        mode % legendSorting[group].onModes.length
      ].compareFunction
    )
    return(
      <div className={styles.container} >
        <LegendBar 
          sort={this.state.sort}
          adjustSort={(group) => this.adjustSort(group)}
        />
        {
          trackbankSorted.map((track, index) => {
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

const LegendBar = (props) => {
  const { sort, adjustSort } = props;
  return(
    <div className={styles.legend}>
      <div className={styles.legendImageBreak}></div>
      <div className={styles.legendAlign}>
          {
            legendSorting.map((sortgroup, index) => {
              const content = (() => {
                if(sort.group === index){
                  return sortgroup.onModes[sort.mode % sortgroup.onModes.length];
                }
                else return sortgroup.offMode;
              })();
              return(
                <div 
                  className={sortgroup.style} 
                  key={index} 
                  onClick={() => adjustSort(index)}>
                  { content.icon &&
                    <FA name={content.icon} className={styles.sortIcon} />
                  }
                  { content.text }
                </div>
              )
            })
          }
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
        <div
          onClick={() => cb(audioFeats.keyIndex, 'activeKey')}
          title={camelotKey.name} 
          className={styles.key}
        >
          {classicalKey.note.name + classicalKey.mode.symbol}
        </div>
        <div 
          className={styles.tempo}
          title={audioFeats.tempo + " BPM"}
          onClick={() => cb(Math.round(audioFeats.tempo), 'activeTempo')}
        > 
          <span
            className={styles.bpm} 
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