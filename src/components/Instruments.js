import React from 'react';
import Drums from './Drums';
import Bass from './Bass';
import LeadSynth from './LeadSynth';
import Harmony from './Harmony';

const Instruments = () => {
    return (
        <section id="instruments">
            <Drums />
            <Bass />
            <Harmony />
            <LeadSynth />
        </section>
    );
};

export default Instruments