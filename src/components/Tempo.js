import React from 'react';

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