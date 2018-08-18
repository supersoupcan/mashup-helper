import axios from 'axios';
import config from './config';

axios.defaults.baseUrl = 'api'

const api = {
  auth : {
    session : () =>  axios.get('/auth/session'),
    logout : () => axios.get()
  },
  spotify : {
    search : (params) => axios.get(
      '/spotify/search', 
      { params : {
        q : params.query,
        type : params.type,
        limit : config.searchLimit,
        offset : params.offset || 0
      }}
    )
  }
}

export default api;