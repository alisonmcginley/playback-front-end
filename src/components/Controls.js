import React from 'react';
import PropTypes from 'prop-types';
import Tempo from './Tempo';
import Record from './Record';
import Clear from './Clear';

const generateControlComponents = () => {
    return (
        <section id="controls">
            <Tempo />
            <Record />
            <Clear />
        </section>

    );
};

const Controls = () => {
    return generateControlComponents()
};

export default Controls