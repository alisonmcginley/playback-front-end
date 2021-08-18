import React from 'react';
import "./controlButtons.css"

const ClearButton = (props) => {
    return (
        <button onClick={props.onClick} className="controlButton">Clear</button>
    )
}
export default ClearButton