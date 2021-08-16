import React, { useEffect } from 'react';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext()
const osc = ac.createOscillator();
osc.frequency.value = 800

const Metronome = (props) => {
    return <button onclick={props.onClick}>Metronome</button>
}

export default Metronome