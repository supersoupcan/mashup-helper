import React, { Component } from 'react';

import styles from './SVGCamelotFilter.css';

import { SVGRing } from '../utils/SVGHelper';
import CamelotModel from '../models/Camelot.model';
import ClassicalModel from '../models/Classical.model';

export default class SVGCamelotFilter extends Component{
  render(){
    const w=300;
    const h=300;

    const rx = w/2;
    const ry = h/2;

    const outerRing = SVGRing(12, -5*Math.PI/12, rx, ry, 5*rx/8, 5*ry/8);
    const innerRing = SVGRing(12, -5*Math.PI/12, 5*rx/8, 5*ry/8, rx/4, ry/4);
    return(
      <svg width={w} height={h}>
        <g transform={'translate(' + rx + ',' + ry + ')'}>
          {
            outerRing.map((data, index) => {
              return(
                <CamelotSection key={index} index={index} data={data} />
              )
            })
          }
          {
            innerRing.map((data, index) => {
              return(
                <CamelotSection key={index} index={index + 12} data={data}/>
              )   
            })
          }
        </g>
      </svg>
    )
  }
}

const CamelotSection = (props) => {
  const { index, data } = props;
  const key = CamelotModel.keys[index];
  const classical = ClassicalModel.find(index);
  const name = classical.note.name + classical.mode.symbol;
  return(
    <g onClick={() => console.log(index)}>
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
      { key.name }
      </text>
      <text
        className={styles.classicName}
        dominantBaseline='central' 
        textAnchor='middle' 
        x={data.lowX} y={data.lowY}>
        {name}
      </text>
    </g>
  )
}