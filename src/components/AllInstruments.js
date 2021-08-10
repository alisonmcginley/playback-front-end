import React from 'react';
import PropTypes from 'prop-types';
import Instrument from "./Instrument"

const generateInstruments = (instrumentData) => {
    const instrumentComponents = instrumentData.map(instrument => {
        return <Instrument instrument = {instrumentData.audioSamples} playNote = {instrumentData.playNote} />
    })
    console.log(instrumentData)
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