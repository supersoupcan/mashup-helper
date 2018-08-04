const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const auth = require('./routes/auth');
const spotify = require('./routes/spotify');

const config = require('./config');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.static(path.resolve(__dirname, '..', 'client_dist')));
app.use(session({
  secret : config.SESSION_SECRET,
  resave : true,
  saveUninitialized : true,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SpotifyStrategy({
    clientID : config.SPOTIFY_CLIENT_ID,
    clientSecret : config.SPOTIFY_CLIENT_SECRET,
    callbackURL : config.BASE_URL + '/auth/login/success' 
  },
  (accessToken, refreshToken, expires_in, profile, done) => {
    return done(null, { accessToken, profile })
  }),
)

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/auth', auth(passport));
app.use('/spotify', spotify);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client_dist', 'index.html'));
});

app.listen(3000, 'localhost', () => {
  console.log('server running on http://localhost:3000');
});