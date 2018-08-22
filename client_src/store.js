import { createStore, combineReducers, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import auth from './reducers/auth';
import collections from './reducers/collections';

export default createStore(
  combineReducers({ auth, collections }),{
    auth: {
      session: null,
      ui: {
        pending: false,
        error: null
      },
    },
    collections : []
  },
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)