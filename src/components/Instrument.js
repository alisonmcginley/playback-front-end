import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';


const setNotes = (keyAssignments, keyCallBack) => {
    const noteComponents = keyAssignments.map(keyAssignment => {
    return (
        <Note keyAssignment={keyAssignment} key = {keyAssignment._id} keyCallBack = {keyCallBack}/>
    )

});
    return (
        <div class="notes">
           {noteComponents} 
        </div>
    )

};

const Instrument = ({ keyAssignments, keyCallBack}) => {
    const noteList = setNotes(keyAssignments, keyCallBack);
    console.log(noteList)
    return <div>
        {noteList}
    </div>

};

Instrument.propTypes = {
    keyAssignments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        AUDIO_URI: PropTypes.string
    })),
    keyCallBack: PropTypes.func
}

export default Instrument