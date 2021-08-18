// builds object with sixteenth notes as keys, will accept audio samples for values
export const buildMap = (sixteenthNote) => {
    let noteMap = {};
    for(let i =0; i<(sixteenthNote*32); i+=sixteenthNote){
        noteMap[i]=[]
    }
    return noteMap
}

// snaps incoming audio to a sixteenth note grid, based on the distance between notes played
export const quantize = (times, twoMeasures, sixteenthNote) => {
    let quantizedNote = 0
    const quantizedArray =[]
    for(let i=0; i< times.length-1;i++){
        let timeDifference = Math.round(times[i+1] - times[0]);
        let toSixteenth = timeDifference % sixteenthNote;
        if(toSixteenth > sixteenthNote/2){
            quantizedNote = timeDifference - toSixteenth
        }else {quantizedNote = timeDifference - toSixteenth
        if(quantizedNote > 5812.5){
            quantizedNote = 0
        }
        quantizedArray.push(quantizedNote)
        console.log(times, timeDifference, quantizedNote)
    }if(quantizedArray.length> 0){
    const sum = quantizedArray.reduce((result,number) => result+number);
    quantizedArray.push(twoMeasures-sum)
    console.log(quantizedArray)
    return quantizedArray
    }
}
}

// quantizes all subarrays from allTimeArrays
export const quantizeAll = (allTimeArrays, twoMeasures, sixteenthNote) => {
    let quantizedObject = {}
    for(let array in allTimeArrays){
            let quantizedArray = quantize(allTimeArrays[array], twoMeasures, sixteenthNote)
            quantizedObject[array] = quantizedArray
        }
    console.log(quantizedObject)
    return quantizedObject
    }
    

// populates map with audio samples
export const populateMap = (noteArrays, timeArrays, noteMap, twoMeasures, sixteenthNote) => {
    const quantizedObject = quantizeAll(timeArrays, twoMeasures, sixteenthNote);
    for(let array in noteArrays){
        if(quantizedObject[array]){
            for(let i =0; i < quantizedObject[array].length; i++){
            let step = quantizedObject[array][i]
            noteMap[step].push(noteArrays[array][i])
        } 
        }  
    }
    return noteMap
}

// all in one
export function scheduleNotes (noteArrays, timeArrays, twoMeasures, sixteenthNote) {
    let noteMap = buildMap(sixteenthNote);
    populateMap(noteArrays, timeArrays, noteMap, twoMeasures, sixteenthNote);
    return noteMap
}



