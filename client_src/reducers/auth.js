import { combineReducers } from 'redux';

const ui = (state = {}, action) => {
  const { type, payload } = action;
  switch(type){
    case 'AUTH_UI_PENDING' : {
      return state = Object.assign({}, state, {
        pending : true,
        error : null
      })
    }case 'AUTH_UI_RESOLVED' : {
      return state = Object.assign({}, state, {
        pending : false,
        error : null
      })
    }case 'AUTH_UI_REJECTED' : {
      return state = Object.assign({}, state, {
        pending : false,
        error : payload
      })
    }
  }
  return state;
}

const session = (state = {}, action) => {
  const { type, payload } = action;
  switch(type){
    case 'AUTH_SESSION_RESOLVED' : {
      return state = payload;
    }
  }
  return state;
}

export default combineReducers({ ui, session });