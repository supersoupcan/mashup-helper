module.exports = function(passport){
  const router = require('express').Router();

  router.get('/session', (req, res) => {
    
    if(req.session.hasOwnProperty('passport')){
      let payload = {
        expiration : req.session.cookie._expires,
        profile : req.session.passport.user.profile
      };
      res.status(200).json(payload);
    }else{
      res.status(200).json(null);
    }
  })

  router.get('/login', passport.authenticate('spotify'));

  router.get('/login/success', 
    passport.authenticate('spotify', { failureRedirect : '/' }),
   (req, res) => {
      req.session.cookie.expires = new Date(Date.now() + 60 * 60 * 1000);
      res.status(200)
      res.redirect('/')
    }
  )

  router.get('/logout', (req, res) => {
    req.session.destroy();
  })

  return router;
}