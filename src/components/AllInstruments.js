import React from 'react';
import PropTypes from 'prop-types';
import Instrument from "./Instrument"


const generateKeys = (samples, instrumentName) => {
    const keys = ["q", "w", "e","r","t","y","u","i","o","p"]
        const keyAssignments = {}
        keyAssignments[instrumentName] = []
        for(let i =0; i< samples.length; i++){
            const keyAssignment = {};
            keyAssignment[keys[i]] = samples[i]["AUDIO_URI"];
            keyAssignments[instrumentName].push(keyAssignment)
    }
    return keyAssignments
}

const generateInstruments = (instrumentData, keyCallBack, selectedInstrument) => {
    const instrumentComponents = instrumentData.map(instrument => {
    const keyAssignments = generateKeys(instrument.audioSamples, instrument.name);

        return <Instrument selectedInstrument = {selectedInstrument} instrumentName = {instrument.name} keyAssignments = {keyAssignments[instrument.name]} keyCallBack = {keyCallBack}/>
    })

    return (
        <div class="instrumentComponents">

            {instrumentComponents}
        </div>
    )
}
const AllInstruments = ({instrumentData, keyCallBack, selectedInstrument}) => {
    const instrumentList = generateInstruments(instrumentData, keyCallBack, selectedInstrument);
    return <div>
        {instrumentList}
    </div>
}

AllInstruments.propTypes= {
    instrumentData: PropTypes.array,
    keyCallBack: PropTypes.func

}

export default AllInstruments