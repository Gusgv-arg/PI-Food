export function printDiets (array, property){
    let string = ""
    for (let i=0; i<array.length; i++){
        for (let prop in array[i]){
            if (prop===property){
                string = string + ", "+ array[i][prop]
            }
        }
    }
    return string
} 