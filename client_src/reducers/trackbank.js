import Track from '../models/Track';

const trackbank = (state = [], action) => {
  const { type, payload, meta } = action;

  switch(type){
    case "ADD_TRACKS": {
      return [
        ...state.slice(),
        ...payload.map(
          (track) => new Track(
            Object.assign({}, track, { album: meta.album })
          )
        )
      ]
    }
    case "ADD_TRACK": {
      return [
        ...state.slice(),
        new Track(
          Object.assign({}, meta.track, { audioFeats : payload })
        )
      ]
    }
    case "REMOVE_TRACK": {
      const indexToRemove = state.findIndex((track) => track.id === payload.id);

      return [
        ...state.slice(0, indexToRemove),
        ...state.slice(indexToRemove + 1)
      ]
    }
  }
  return state;
}

export default trackbank;