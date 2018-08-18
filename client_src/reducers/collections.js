const collections = (state = [], action) => {
  const { type, payload } = action;
  switch(type){
    case 'COLLECTION_ADD': {
      return state = [
        ...state.slice(),
        payload
      ]
    }
    case 'COLLECTION_REMOVE': {
      const { type, payload } = action;
      const index = 0;

      return state = [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ]
    }
  }
}