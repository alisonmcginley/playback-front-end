
import React from 'react';
import PropTypes from 'prop-types';
import './note.css';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext()

const Note = (props) => {
    const noteAudio = new Audio(Object.values(props.keyAssignment))
    const playCallBack = (e) => {
        props.keyCallBack(e, noteAudio)
    }
    return <button onKeyPress={(e) => playCallBack(e)} audio = {noteAudio} key = {props.key} keyAssignment= {props.keyAssignment} className ="note" tabindex="0">Note</button>   
};

Note.propTypes = {
    keyCallBack: PropTypes.func,
    keyAssignment: PropTypes.string,

};
// write api call based on Note.instrument
export default Note