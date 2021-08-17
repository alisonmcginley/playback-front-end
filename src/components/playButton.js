import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = (props) => {
    return(
        <button isplaying = {props.isplaying} onClick={props.onClick} >Play </button>
    )
}

export default PlayButton