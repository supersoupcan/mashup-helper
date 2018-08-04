import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const {value, label, onToggle, name} = props;
  return(
    <span>
      <input 
        checked={value} type="checkbox" 
        name={name} onChange={(e) => onToggle(e)} 
      />
      <label>{label}</label>
    </span>
  )
}

Checkbox.propTypes = {
  value : PropTypes.bool.isRequired,
  label : PropTypes.string.isRequired,
  name : PropTypes.string.isRequired,
  onToggle : PropTypes.func.isRequired
}

export default Checkbox;