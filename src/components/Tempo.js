import React from 'react';
import PropTypes from 'prop-types';

// const TapTempo = (function() {
//     function TapTempo()
//  {
//      this.taps= [];
//      this.isRecording = false;
//  }

// TapTempo.prototype.recordTime = function() {
//     const date = new Date;
//     const time = date.getTime();
//     this.taps.push(time);
//     this.isRecording = true;
// };
// TapTempo.prototype.getBpm = function() {
//     const deltas = this.getDeltas();
//     return this.calculateBpm(deltas);
// };
// TapTempo.prototype.clearTimes = function() {
//     this.taps = [];
//     this.isRecording = false;
// };
// TapTempo.prototype.getDeltas = function() {
//     const deltas = [];
//     for(let i = 0; i<this.taps.length - 1; i++) {
//         const delta = this.taps[i+1] - this.taps[i];
//         deltas.push(delta)
//     }
//     return deltas;
// };
// TapTempo.prototype.calculateBpm = function(deltas) {
//     const sum = 0;
//     const average = 0;
//     for(let delta in deltas) {
//         sum += deltas[delta];
//     }
//     average = sum / deltas.length;

//     return (6000 / average)
// }
// TapTempo.prototype.isRecording = function() {
//     return this.isRecording
// };
// return TapTempo;
// })();


const Tempo = (props) => {
    return ( <div>
        <input 
        className="tempoInput" 
        label="tempo" 
        type="number" 
        min="50" 
        max="180"
        value={props.value}
        onChange = {props.onTempoChange}></input>
    </div>)
}

export default Tempo