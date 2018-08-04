import React, { Component } from 'react';

import styles from './SVGClassicalFilter.css';

import ClassicalModel from '../models/Classical.model';

export default class SVGClassicalFilter extends Component{
  constructor(props){
    super(props);
    this.state = {
      note : null,
      mode : null,
    }
  }

  render(){
    const parentWidth=300;
    const parentHeight=200;
    
    const whiteWidth = parentWidth/7;
    const whiteHeight = parentHeight;
    const blackWidth = 2 * whiteWidth / 3;
    const blackHeight = 3 * parentHeight / 5;

    let xCounter = 0;

    let whiteNotes = [];
    let blackNotes = [];

    ClassicalModel.orderNotes.forEach((note, index) => {
      let props = {};
      props.key = index;
      props.note = note;
      if(note.white){
        props = Object.assign(props, {
          x : xCounter * whiteWidth,
          y : 0,
          width : whiteWidth,
          height : whiteHeight,
          white : true,
        })
        whiteNotes.push(props);
        xCounter += 1;
      }else{
        props = Object.assign(props, {
          x : xCounter * whiteWidth - (blackWidth / 2),
          y : 0,
          width : blackWidth,
          height : blackHeight,
          white : false
        })
        blackNotes.push(props);
      }
    })

    return(
      <div>
        <svg width={parentWidth} height={parentHeight}>
          { whiteNotes.map((props) => <SVGPianoKey {...props} />)}
          { blackNotes.map((props) => <SVGPianoKey {...props} />)}
        </svg>
        <div>
          <input 
            type="radio" 
            value='0' 
            checked={this.state.mode === '0'} 
          />
          <label>major</label>
          <input 
            type='radio' 
            value='1' 
            checked={this.state.mode === '1'}
          />
          <label>minor</label>
        </div>
      </div>
    )
  }  
}

class SVGPianoKey extends Component{
  constructor(props){
    super(props);
    this.state = {
      hovered : false
    }
  }

  render(){
    return(
      <g>
        <rect
          onMouseEnter={() => this.setState({hovered : true})}
          onMouseLeave={() => this.setState({hovered : false})}
          x={this.props.x}
          y={this.props.y}
          width={this.props.width}
          height={this.props.height}
          className={this.props.white ? styles.white : styles.black}
          id={'classicalNote' + this.props.note.index}
        />
        <text />
      </g>
    )
  }
};
