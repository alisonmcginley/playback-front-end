import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import './instrument.css';



const setNotes = (selectedInstrument, keyAssignments, keyCallBack, instrumentName) => {
    const noteComponents = keyAssignments.map(keyAssignment => {
    return (
        <Note selectedInstrument = {selectedInstrument} instrumentName = {instrumentName} keyAssignment={keyAssignment} key = {keyAssignment._id} keyCallBack = {keyCallBack}/>
    )
});
    return (
        <div class="instrumentGrid">
           {noteComponents} 
        </div>
    )

};


const Instrument = ({ selectedInstrument, keyAssignments, keyCallBack, instrumentName}) => {
    const noteList = setNotes(selectedInstrument, keyAssignments, keyCallBack, instrumentName);
    return <div>
        {noteList}
    </div>

};

Instrument.propTypes = {
    keyAssignments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        AUDIO_URI: PropTypes.string
    })),
    keyCallBack: PropTypes.func,
    instrumentName: PropTypes.string
}

export default Instrument