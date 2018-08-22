const Collection = function(type, name){
  this.type = type;
  this.name = name;
}

const Track = function(){
  Collection.call(this, 'track', 'Track')
}

const Artist = function(){
  Collection.call(this, 'artist', 'Artist')
}

const Album = function(){
  Collection.call(this, 'album', 'Album')
}

export { Track, Artist, Album }