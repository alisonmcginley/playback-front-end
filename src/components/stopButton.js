import React from 'react';
import "./controlButtons.css"

const StopButton = (props) => {
    return(
        <button isplaying = {props.isplaying} onClick={props.onClick} className="controlButton" id="stopButton">Stop</button>
    )
}

export default StopButton