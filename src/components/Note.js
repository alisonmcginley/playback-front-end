import React from 'react';
import PropTypes from 'prop-types';
import './note.css';


const Note = (props) => {
    return <span onKeyDown ={props.playNote} key = {props.id} AUDIO_URI = {props.AUDIO_URI} className ="note">Note</span>   
};

Note.propTypes = {
    AUDIO_URI: PropTypes.string.isRequired
};
// write api call based on Note.instrument
export default Note