import { createStore, combineReducers, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import auth from './reducers/auth';

export default createStore(
  combineReducers({ auth }),{
    auth : {
      session : null,
      ui : {
        pending : false,
        error : null
      },
    },
  },
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)