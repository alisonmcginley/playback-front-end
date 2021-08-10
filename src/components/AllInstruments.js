import React from 'react';
import PropTypes from 'prop-types';
import Instrument from "./Instrument"


const generateKeys = (samples) => {
    const keys = ["q","w","e","r","t","y","u","i","o"]
        const keyAssignments = []

        for(let i =0; i< samples.length; i++){
            const keyAssignment = {};
            keyAssignment[keys[i]] = samples[i]["AUDIO_URI"];
            keyAssignments.push(keyAssignment)
    }
    return keyAssignments
}

const generateInstruments = (instrumentData) => {
    
    const instrumentComponents = instrumentData.map(instrument => {
    const keyAssignments = generateKeys(instrument.audioSamples)    
        return <Instrument keyAssignments = {keyAssignments} />
    })
    return (
        <div class="instrumentComponents">
            {instrumentComponents}
        </div>
    )
}
const AllInstruments = ({instrumentData}) => {
    const instrumentList = generateInstruments(instrumentData);
    return <div>
        {instrumentList}
    </div>
}

AllInstruments.propTypes= {
    instrumentData: PropTypes.array
}

export default AllInstruments