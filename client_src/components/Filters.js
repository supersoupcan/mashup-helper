import React, { Component } from 'react';

import ClassicalModel from '../models/Classical.model';
import CamelotModel from '../models/Camelot.model';
import { KeyFilters, TempoFilters } from '../models/Filters.model';;

import SVGCamelotFilter from './SVGCamelotFilter';

import styles from './Filters.css';

const Filters = (props) => {
  const {filterTempo, activeTempo, filterKey, activeKey, cb } = props;
  return(
    <div className={styles.container}>
      <KeyFilter active={activeKey} filter={filterKey} cb={cb}/>
      <TempoFilter active={activeTempo} filter={filterTempo} cb={cb}/>
    </div>
  )
}

const TempoFilter = (props) => {
  const {filter, active, cb} = props;
  function activeCheck(e){
    const value = e.target.value;
    const isInt = Number.isInteger(Number(value));
    const inRange = (value < 1000 && value >= 0)

    if(isInt && inRange){
      cb(value, "activeTempo");
    }
  }

  return(
    <div className={styles.padding}>
      <div className={styles.filterHolder}>
        <div className={styles.filter}>
          <div className={styles.filterName}>{'Tempo'}</div>
          <div className={styles.filterTools}>
            <div className={styles.filterTool}>
              <div className={styles.toolName}>{'Target'}</div>
              <span className={styles.targetTempo}>
                <input 
                  value={active}
                  onChange={activeCheck}
                />
                <span className={styles.bpmWord}>{' BPM'}</span>
              </span>
            </div>
            <div className={styles.filterTool}>
              <div className={styles.toolName}>{'Filter'}</div>
              <select 
                  value={filter}
                  onChange={(e) => cb(e.target.value, 'filterTempo')}
                >
                  {
                    TempoFilters.map((keyFilter, index) => {
                      return(
                        <option
                          key={index}
                          value={index}
                        >
                          {keyFilter.name}
                        </option>
                      )
                    })
                  }
                </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

class KeyFilter extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeDropDown: false
    }
  }
  toggleDropDown(){
    this.setState({
      activeDropDown: !this.state.activeDropDown
    })
  }
  render(){
    const {filter, active, cb} = this.props;
    const camelotKey = CamelotModel.keys[active];
    const classical = ClassicalModel.find(active);
    return(
      <div className={styles.padding}>
        <div className={styles.filterHolder}>
          <div className={styles.filter}>
            <div className={styles.filterName}>{'Key'}</div>
            <div className={styles.filterTools}> 
              <div className={styles.filterTool}>
                <div className={styles.toolName}>{'Target'}</div>
                <div 
                  className={styles.targetTempo}
                  onClick={() => this.toggleDropDown()}
                  //style={{'backgroundColor': '#' + camelotKey.color}}
                >
                  <span>
                    {classical.note.name + classical.mode.symbol}
                  </span>
                </div>
              </div>
              <div className={styles.filterTool}>
                <div className={styles.toolName}>{'Filter'}</div>
                <select 
                  value={filter}
                  onChange={(e) => cb(e.target.value, 'filterKey')}
                >
                  {
                    KeyFilters.map((keyFilter, index) => {
                      return(
                        <option
                          key={index}
                          value={index}
                        >
                          {keyFilter.name}
                        </option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          { this.state.activeDropDown && 
              <div className={styles.dropDown}>
                <div className={styles.padding}>Select New Target Key</div>
                <SVGCamelotFilter 
                  width={320} 
                  height={320} 
                  cb={(value) => {
                    this.toggleDropDown();
                    cb(value, "activeKey");
                  }}
                />
              </div>
            }
        </div>
      </div>
    )
  }
}

export default Filters;