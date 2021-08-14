
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './note.css';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext()


const Note = (props) => {
    let noteActive = false
    useEffect(() => {
        window.addEventListener("keydown", playCallBack);
        // window.addEventListener("keyup", ()=> {noteActive=false})
        return () => {window.removeEventListener("keydown", playCallBack)}}
      , [props.selectedInstrument]);
    
    const noteAudio = new Audio(Object.values(props.keyAssignment))
    const keyKey = Object.keys(props.keyAssignment)
    const playCallBack = (e) => {
        if(e.key == keyKey){
            noteActive = true
            props.keyCallBack(e, noteAudio, props.instrumentName, e.timeStamp)
        }
    }
    return <button onKeyDown={(e) => playCallBack(e)} key = {props.key} instrumentName = {props.instrumentName} 
    keyAssignment= {props.keyAssignment} className ={`note ${noteActive ? 'active': ''}`} ></button>   
};

Note.propTypes = {
    keyCallBack: PropTypes.func,
    keyAssignment: PropTypes.string,

};
// write api call based on Note.instrument
export default Note