import axios from 'axios';
import config from './config';

axios.defaults.baseUrl = 'api'

const api = {
  auth : {
    session: () =>  axios.get('/auth/session'),
    logout: () => axios.get()
  },
  spotify: {
    search: (params) => axios.get(
      '/spotify/search', { 
        params: {
          q: params.query,
          type: 'album,artist,playlist,track',
          limit: config.searchLimit,
    }}),
    albumTrackAudioFeats: (id, total) => axios.get(
      '/spotify/albumTrackAudioFeats', {
        params: { 
          id : id, 
          total: total 
    }}),
    trackAudioFeat: (id) => axios.get(
      '/spotify/trackAudioFeat', {
        params : {
          id : id
    }})
  }
}

export default api;