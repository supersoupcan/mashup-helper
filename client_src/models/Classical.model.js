const ClassicalModel = function(){
  this.notes = [
    {name: "B", order: 11, white: true},
    {name: "F#", order: 6, white: false},
    {name: "D♭", order: 1, white: false},
    {name: "A♭", order: 8, white: false},
    {name: "E♭", order: 3, white: false},
    {name: "B♭", order: 10, white: false},
    {name: "F", order: 5, white: true},
    {name: "C", order: 0, white: true},
    {name: "G", order: 7, white: true},
    {name: "D", order: 2, white: true},
    {name: "A", order: 9, white: true},
    {name: "E", order: 4, white: true}
  ]
}

ClassicalModel.prototype = {
  get orderNotes(){
    return this.notes.map((note, index) => {
      const orderIndex = this.notes.findIndex((note) => note.order === index);
      return Object.assign({}, this.notes[orderIndex], { index: orderIndex });
    })
  },
  find: function(index){
    let note, mode;

    if(index < 12){
      note = this.notes[index];
      mode = {
        name: 'major', symbol: '', index : 0
      }
    }else{
      note = this.notes[(index + 3) % 12];
      mode = {
        name: 'minor', symbol: 'm', index: 1
      }
    }
    return ({ note, mode, index })
  }
}

export default new ClassicalModel();