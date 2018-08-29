import ClassicalModel from "./Classical.model";

const CamelotModel = function(){
  this.keys = [
    { name: '1B', color: '3dd96e' },
    { name: '2B', color: 'c5e779' },
    { name: '3B', color: 'dbd673' },
    { name: '4B', color: 'dcb869' },
    { name: '5B', color: 'f7ad6c' },
    { name: '6B', color: 'fb8462' },
    { name: '7B', color: 'f5485c' },
    { name: '8B', color: 'e145a6' },
    { name: '9B', color: 'ab5bcc' },
    { name: '10B', color: '6b5ecd' },
    { name: '11B', color: '488ccb' },
    { name: '12B', color: '35ced3' },
    { name: '1A', color: 'a1ecb4' },
    { name: '2A', color: 'e1f3b9' },
    { name: '3A', color: 'dfdfa9' },
    { name: '4A', color: 'e1cea3' },
    { name: '5A', color: 'fad6b4' },
    { name: '6A', color: 'fcc1af' },
    { name: '7A', color: 'fba6ad' },
    { name: '8A', color: 'f1a2d1' },
    { name: '9A', color: 'd1a5e2' },
    { name: '10A', color: 'aca7df' },
    { name: '11A', color: 'a3c5e8' },
    { name: '12A', color: '9ce8e8' },
  ]
}

CamelotModel.prototype = {
  find: function(mode, order){
    let index, key;

    if(mode === 0){
      //Major Key
      index = ClassicalModel.orderNotes[order].index;
    }else if(mode === 1){
      //Minor Key
      index = ClassicalModel.orderNotes[((order + 9) % 12)].index + 12;
    }

    key = this.keys[index];

    return index;
  }
}

export default new CamelotModel();