import CamelotModel from '../models/Camelot.model';

function Track(data){
  this.id = data.id;
  this.name = data.name;
  this.album = data.album ? new Album(data.album) : null;
  this.artists = data.artists.map(artist => new Artist(artist));
  this.audioFeats = data.audioFeats ? new Features(data.audioFeats) : null;
  this.durationMs = data.duration_ms;
}

function Album(data){
  this.image = data.images[data.images.length - 1];
  this.name = data.name;
  this.totalTracks = data.total_tracks;
  this.id = data.id;
  this.release_data
}

function Artist(data){
  this.name = data.name;
  this.id = data.id;
}

function Features(data){
  const fixedMode = (data.mode + 1) % 2;
  this.keyIndex = CamelotModel.find(fixedMode, data.key);
  this.tempo = data.tempo;
  this.timeSignature = data.time_signature;
  this.loudness = data.loudness;
  this.measures = {
    danceability: data.danceability,
    energy: data.energy,
    speechiness: data.speechiness,
    acousticness: data.acousticness,
    instrumentalness: data.instrumentalness,
    liveness: data.liveness,
    valence: data.valence,
  }
}

export default Track;