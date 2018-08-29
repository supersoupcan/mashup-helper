const TempoFilter = function(name, percent){
  this.name = name;
  this.percent = percent;
}

TempoFilter.prototype = {
  test: function(target, track){
    const tempo = track.audioFeats.tempo;
    if(this.percent){
      const lower = target * (1 - this.percent);
      const higher = target * (1 + this.percent);

      const tests = [{
        matchName: '(2x) ',
        tempo: tempo / 2,
      },{
        matchName: '',
        tempo: tempo,
      },{
        matchName: '(0.5x) ',
        tempo: tempo * 2
      }];
      
      return tests.reduce((acc, current) => {
        const result = current.tempo <= higher && current.tempo >= lower;
        if(result){
          return { success: true, name: current.matchName };
        }else{
          return acc;
        }
      },{ success: false })
    }else{
      return { success: true, name: ''}
    }
  }
}

const TempoFilters = [
  new TempoFilter("Match", 0.001),
  new TempoFilter('±2.5%"', 0.025),
  new TempoFilter('±5%', 0.05),
  new TempoFilter('±10%', 0.10),
  new TempoFilter('±15%', 0.15),
  new TempoFilter('Off', false),
];

const KeyFilter = function(name, keyIndexes){
  this.name = name;
  this.keyIndexes = keyIndexes
}

KeyFilter.prototype = {
  test: function(target, track){
    if(this.keyIndexes.length > 0){
      return this.keyIndexes.reduce((acc, current) => {
        const result = (target + current) % 24 === track.audioFeats.keyIndex;
        if(result){
          return { success: true };
        }
        return acc;
      },{ success: false })
    }else{
      return { success: true }
    }
  }
}


const KeyFilters = [
  new KeyFilter('Match', [0]),
  new KeyFilter('Relative', [0, 12]),
  new KeyFilter('Harmonic', [-1, 0, 1, 12]),
  new KeyFilter('Off', [])
];

export { KeyFilters, TempoFilters };