import React from 'react';
import "./controlButtons.css"

const PlayButton = (props) => {
    return(
        <button isplaying = {props.isplaying} onClick={props.onClick} className="controlButton" id="playButton">Play </button>
    )
}

export default PlayButton