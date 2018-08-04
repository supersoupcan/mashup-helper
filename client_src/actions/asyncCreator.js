export default function asyncCreator(promise, events){
  const { resolve, reject, pending} = events;
  //Provides a basic interface for handling async requests
  return async function(dispatch){
    function createCommands(commands, payload){
      function create(command){
        switch(typeof command){
          case 'function' : {
            //CALL COMMAND AS FUNCTION
            command(payload);
            break;
          }
          case 'string' : {
            //DISPATCH COMMAND AS REDUX ACTION TYPE
            dispatch({
              type: command,
              payload: payload
            })
            break;
          }
        }
      }
      if(Array.isArray(commands)){
        commands.forEach((command) => {
          create(command);
        })
      }else if(commands){
        create(commands);
      }
    }

    createCommands(pending);
    try{
      const res = await Promise.race([
        promise,
        new Promise((resolve, reject) => window.setTimeout(
          () => reject(new Error('async action timeout')), 3000
        ))
      ]);

      if(res.status >= 400){
        throw new Error('Error: ' + res.statusText);
      }else{
        createCommands(resolve, res.data);
      }
    }catch(error){
      createCommands(reject, error)
    }
  }
}

