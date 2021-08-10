import React from 'react';
import PropTypes from 'prop-types';
import Instrument from "./Instrument"

const generateInstruments = (instrumentData) => {
    const instrumentComponents = instrumentData.map(instrument => {
        console.log(instrument.audioSamples)
        return <Instrument instrument = {instrument.audioSamples} />
    })
    return (
        <div class="instrumentComponents">
            {instrumentComponents}
        </div>
    )
}
const AllInstruments = ({instrumentData}) => {
    const instrumentList = generateInstruments(instrumentData);
    console.log(instrumentList)
    return <div>
        {instrumentList}
    </div>
}

AllInstruments.propTypes= {
    instrumentData: PropTypes.array
}

export default AllInstruments