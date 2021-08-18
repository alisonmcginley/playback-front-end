import React from 'react';
import "./controlButtons.css"

const ClearButton = (props) => {
    return (
        <button onClick={props.onClick} className="controlButton" id="clearButton">Clear</button>
    )
}
export default ClearButton