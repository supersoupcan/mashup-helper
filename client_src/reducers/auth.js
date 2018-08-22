import { combineReducers } from 'redux';

const ui = (state = {}, action) => {
  const { type, payload, error } = action;
  switch(type){
    case 'AUTH_UI_PENDING' : {
      return state = Object.assign({}, state, {
        pending : true,
        error : null
      })
    }case 'AUTH_UI_RESPONSE' : {
      return state = Object.assign({}, state, {
        pending : false,
        error : error
      })
    }
  }
  return state;
}

const session = (state = {}, action) => {
  const { type, payload } = action;
  switch(type){
    case 'AUTH_SESSION_RESOLVE' : {
      return state = payload;
    }
  }
  return state;
}

export default combineReducers({ ui, session });