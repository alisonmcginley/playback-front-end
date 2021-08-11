import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';


const setNotes = (keyAssignments, keyCallBack, instrumentName) => {
    const noteComponents = keyAssignments.map(keyAssignment => {
    return (
        <Note instrumentName = {instrumentName} keyAssignment={keyAssignment} key = {keyAssignment._id} keyCallBack = {keyCallBack}/>
    )

});
    return (
        <div class="notes">
           {noteComponents} 
        </div>
    )

};

const Instrument = ({ keyAssignments, keyCallBack, instrumentName}) => {
    const noteList = setNotes(keyAssignments, keyCallBack, instrumentName);
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