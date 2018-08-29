import config from '../config';

//Provides a basic interface for handling async requests
//use meta parameter to pass additional contextual data to callback

export default function asyncCreator(promise, options){
  const { pending, response, resolve, reject } = options.on;
  const meta = options.meta || null;

  //pending: fires when before async action is attempted
  //responsed: fires on any async callback
  //resolved: fires on successful async callback
  //rejected: fires on failed async callback

  return async function(dispatch){
    function facilitateCallbacks(callbacks, data){
      function run(callback){
        switch(typeof callback){
          case 'function': {
            //Call function
            callback(data, meta);
            break;
          }
          case 'string': {
            //Dispatch as redux action type
            dispatch(Object.assign({}, { 
              type: callback, 
              meta: meta 
            }, data ));
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
    if(pending) facilitateCallbacks(pending, {});
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
        if(response) facilitateCallbacks(response, { payload: res.data })
        if(resolve) facilitateCallbacks(resolve, { payload: res.data });
      }
    }catch(error){
      if(response) facilitateCallbacks(response, { error })
      if(reject) facilitateCallbacks(reject, { error });
    }
  }
}

