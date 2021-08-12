import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = (props) => {
    return(
        <button isPlaying = {props.isPlaying} onClick={props.onClick} >Play </button>
    )
}

export default PlayButton