const Type = function(type, name){
  this.type = type;
  this.name = name;
}

const Track = function(){
  Type.call(this, 'track', 'Track')
}

const Artist = function(){
  Type.call(this, 'artist', 'Artist')
}

const Album = function(){
  Type.call(this, 'album', 'Album')
}

export { Track, Artist, Album }