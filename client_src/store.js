import { createStore, combineReducers, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import auth from './reducers/auth';
import trackbank from './reducers/trackbank';

import trackbankData from './test/trackbankData';

export default createStore(
  combineReducers({ auth, trackbank }),{
    auth: {
      session: null,
      ui: {
        pending: false,
        error: null
      },
    },
    trackbank: trackbankData
  },
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)