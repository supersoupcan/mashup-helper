const router = require('express').Router();
const axios = require('axios');
const base = 'https://api.spotify.com/v1';

function auth(req){
  return {
    'Authorization': 'Bearer ' + req.session.passport.user.accessToken 
  }
}


router.all('*', (req, res, next) => {
  if(!req.session.passport.user.accessToken){
    res.status(401);
    res.json({
      error: "must be signed in with a spotify account"
    })
  }else{
    next();
  }
})

router.get('/search*', async (req, res) => {
  try{
    const searchRes = await axios.get(base + '/search', {
      params: req.query,
      headers: auth(req)
    });
    res.status(200).json(searchRes.data);
  }
  catch(error){
    res.status(500).json({
      error: "server error"
    })
  }
})

router.get('/trackAudioFeat', async(req, res) => {
  try{
    const trackAudioFeat = await axios.get(
      base + '/audio-features/' + req.query.id, {
        headers: auth(req)
    })
    res.status(200).json(trackAudioFeat.data);
  }
  catch(error){
    res.status(500).json({
      error: "server error"
    })
  }
})

router.get('/albumTrackAudioFeats', async (req, res) => {
  const albumLimit = 50;
  const albumTotal = req.query.total;
  const audioFeatsLimit = 100;

  try{
    let albumTracks = [];
    for(let i = 0; i < albumTotal; i+= albumLimit){
      const albumTracksChunkRes = await axios.get(
        base + '/albums/' + req.query.id + '/tracks', {
          params : {
            limit: albumLimit,
            offset: i*albumLimit
          },
          headers: auth(req)
      });
      albumTracks = albumTracks.concat(albumTracksChunkRes.data.items);
    }

    for(let j = 0; j < audioFeatsLimit; j+= audioFeatsLimit){
      const ids = 
        albumTracks.slice(j*audioFeatsLimit, (j+1)*audioFeatsLimit)
        .map((albumTrack) => albumTrack.id).join(',');

      const audioFeatsChunkRes = await axios.get(
        base + '/audio-features', {
          params: {
            ids : ids
          },
          headers: auth(req)
        }
      )

      audioFeatsChunkRes.data.audio_features.forEach((audioFeats, index) => {
        const albumTrackIndex = index + j*audioFeatsLimit;
        albumTracks[albumTrackIndex].audioFeats = audioFeats;
      })

      res.status(200).json(albumTracks);
    }
  }
  catch(error){
    res.status(500).json({
      error: "server error"
    })
  }
})

module.exports = router;