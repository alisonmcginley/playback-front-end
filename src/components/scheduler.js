import { fireEvent } from "@testing-library/react";

export const buildMap = (sixteenthNote) => {
    let noteMap = {};
    for(let i =0; i<(sixteenthNote*32); i+=sixteenthNote){
        noteMap[i]=[]
    }
    return noteMap
}
export const quantize = (times, twoMeasures, sixteenthNote) => {
    console.log(times, twoMeasures, sixteenthNote)
    let quantizedNote = 0
    const quantizedArray =[]
    for(let i=0; i< times.length-1;i++){
        let timeDifference = Math.round(times[i+1] - times[0]);
        console.log(timeDifference)
        console.log(timeDifference)
        let toSixteenth = timeDifference % sixteenthNote;
        if(toSixteenth > sixteenthNote/2){
            quantizedNote = timeDifference - toSixteenth
        }else {quantizedNote = timeDifference - toSixteenth
        if(quantizedNote > 5812.5){
            quantizedNote = 0
        }
        quantizedArray.push(quantizedNote)
    }
    if(quantizedArray.length === 0){
        return []
    }
    console.log(twoMeasures)
    const sum = quantizedArray.reduce((result,number) => result+number);
    quantizedArray.push(twoMeasures-sum)
    console.log(quantizedArray)
    return quantizedArray
    }
}

export const quantizeAll = (allTimeArrays, twoMeasures, sixteenthNote) => {
    let quantizedObject = {}
    for(let array in allTimeArrays){
        let quantizedArray = quantize(allTimeArrays[array], twoMeasures, sixteenthNote)
        quantizedObject[array]= quantizedArray
    }
    console.log(quantizedObject)
    return quantizedObject
}

export const populateMap = (noteArrays, timeArrays, noteMap, twoMeasures, sixteenthNote) => {
    const quantizedObject = quantizeAll(timeArrays, twoMeasures, sixteenthNote);

    for(let array in noteArrays){
        for(let i =0; i < quantizedObject[array].length; i++){
            let step = quantizedObject[array][i]
            noteMap[step].push(noteArrays[array][i])
        } 
    }
    console.log(noteMap) 
    return noteMap
}

export const scheduleNotes = (noteArrays, timeArrays, twoMeasures, sixteenthNote) => {
    let noteMap = buildMap(sixteenthNote);
    populateMap(noteArrays, timeArrays, noteMap, twoMeasures, sixteenthNote);
    console.log(noteMap)
    return noteMap
}



