const router = require('express').Router();
const axios = require('axios');

router.all('*', (req, res, next) => {
  if(!req.session.passport.user.accessToken){
    res.status(401);
    res.json({
      error : "must be signed in with a spotify account"
    })
  }else{
    next();
  }
})

router.get('/search*', async (req, res) => {
  try{
    const APIres = await axios.get('https://api.spotify.com/v1/search', {
      params : req.query,
      headers : {
        'Authorization' : 'Bearer ' + req.session.passport.user.accessToken 
      }
    });

    console.log(APIres);
    res.status(200).json(APIres);
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      error : "server error"
    })
  }
})

module.exports = router;