import React, { Component } from 'react';

import styles from './SVGCamelotFilter.css';

import { SVGRing } from '../utils/SVGHelper';
import CamelotModel from '../models/Camelot.model';
import ClassicalModel from '../models/Classical.model';

const SVGCamelotFilter = (props) => {
  const { width, height, cb } = props;

  const rx = width/2;
  const ry = height/2;

  const outerRing = SVGRing(12, -5*Math.PI/12, rx, ry, 5*rx/8, 5*ry/8);
  const innerRing = SVGRing(12, -5*Math.PI/12, 5*rx/8, 5*ry/8, rx/4, ry/4);
  return(
    <svg width={width} height={height}>
      <g transform={'translate(' + rx + ',' + ry + ')'}>
        {
          outerRing.map((data, index) => {
            return(
              <CamelotSection key={index} index={index} data={data} cb={cb}/>
            )
          })
        }
        {
          innerRing.map((data, index) => {
            return(
              <CamelotSection key={index} index={index + 12} data={data} cb={cb}/>
            )   
          })
        }
      </g>
    </svg>
  )
}

const CamelotSection = (props) => {
  const { index, data, cb } = props;
  const key = CamelotModel.keys[index];
  const classical = ClassicalModel.find(index);
  const name = classical.note.name + classical.mode.symbol;
  return(
    <g
      value={index}
      className={styles.section}
      onClick={() => cb(index)}
    >
      <path 
        d={data.d} 
        className={styles.path}
        style={{fill : "#" + key.color}}
      />
      <text 
        className={styles.camelotName}
        dominantBaseline='central' 
        textAnchor='middle' 
        x={data.highX} y={data.highY}
      >
      { name }
      </text>
      <text
        className={styles.classicName}
        dominantBaseline='central' 
        textAnchor='middle' 
        x={data.lowX} y={data.lowY}>
        { key.name }
      </text>
    </g>
  )
}

export default SVGCamelotFilter;