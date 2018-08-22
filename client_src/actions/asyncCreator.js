import config from '../config';

export default function asyncCreator(promise, events){
  const { pending, response, resolve, reject } = events;
  //Provides a basic interface for handling async requests
  
  //pending: fires when before async action is attempted
  //responsed: fires on any async callback
  //resolved: fires on successful async callback
  //rejected: fires on failed async callback 

  return async function(dispatch){
    function faciliateCallbacks(callbacks, data){
      function run(callback){
        switch(typeof callback){
          case 'function': {
            //Call function
            callback(data);
            break;
          }
          case 'string': {
            //Dispatch as redux action type
            dispatch(Object.assign({}, { type : callback }, data ));
            break;
          }
        }
      }
      if(Array.isArray(callbacks)){
        callbacks.forEach((callback) => {
          run(callback);
        })
      }else if(callbacks){
        run(callbacks);
      }
    }
    if(pending) faciliateCallbacks(pending, {});
    try{
      const res = await Promise.race([
        promise,
        new Promise((_, reject) => window.setTimeout(
          () => reject(new Error('async timeout')), config.asyncTimeout
        ))
      ]);

      if(res.status >= 400){
        throw new Error('Error: ' + res.statusText);
      }else{
        if(response) faciliateCallbacks(response, { payload: res.data })
        if(resolve) faciliateCallbacks(resolve, { payload: res.data });
      }
    }catch(error){
      if(response) faciliateCallbacks(response, { error: error })
      if(reject) createCommands(reject, { error: error });
    }
  }
}

