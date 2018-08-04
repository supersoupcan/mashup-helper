import axios from 'axios';

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
        type : params.type.join(','),
        limit : 10,
        offset : 10 * params.next || 0,
      }}
    )
  }
}

export default api;