import React from 'react';
import "./tempo.css"

const Tempo = (props) => {
    return ( <div id="tempoSet">
        <label for="tempo">Tempo:</label>  
        <input  
        id="tempo"
        type="number" 
        name="tempo"
        min="50" 
        max="180"
        value={props.value}
        onChange = {props.onTempoChange}></input>

    </div>)
}

export default Tempo