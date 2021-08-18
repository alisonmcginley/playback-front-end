import React from 'react';

const ClearButton = (props) => {
    return (
        <button onClick={props.onClick} className="controls">Clear</button>
    )
}
export default ClearButton