import React from 'react';

const buildMap = (sixteenthNote) => {
    let noteMap = {};
    for(let i =0; i<sixteenthNote*16; i+sixteenthNote){
        noteMap[i]=[]
    }
    return noteMap
}

const populateMap = (noteArray, timeArray, noteMap) => {
    for(let i=0; i<noteArray.length;i++){
        let step = timeArray[i];
        noteMap[step].push(noteArray[i]);
    }
    return noteMap
}

const scheduleNotes = (noteArray,timeArray,sixteenthNote) => {
    let noteMap = buildMap(sixteenthNote);
    populateMap(noteArray,timeArray,noteMap);
}
