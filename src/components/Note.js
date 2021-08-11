
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './note.css';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext()


const Note = (props) => {
    useEffect(() => {
        window.addEventListener("keydown", playCallBack);
      }, []);
        
    const noteAudio = new Audio(Object.values(props.keyAssignment))
    const keyKey = Object.keys(props.keyAssignment)
 

    const playCallBack = (e) => {
        if(e.key == keyKey){
            props.keyCallBack(e, noteAudio)
        }
    }
    return <button onKeyPress={(e) => playCallBack(e)} key = {props.key} keyAssignment= {props.keyAssignment} className ="note" tabindex="0">Note</button>   
};

Note.propTypes = {
    keyCallBack: PropTypes.func,
    keyAssignment: PropTypes.string,

};
// write api call based on Note.instrument
export default Note