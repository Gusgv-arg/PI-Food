//para recorrer un array y devolver un string
let arr=["mi", "nombre", "es", "aaa"]

const reducedArray = arr.reduce((acc, item) => {
    return acc += " " + item;
})
console.log(reducedArray)

//para recorrer un objeto y devolver un string de alguna propiedad
let arr2=[{name: "a", other: ""}, {name: "b", other:""}, {name: "c", other:""}]

export function listProperties (array, property){
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
console.log(listProperties(arr2, "name").substring(2))

//misma funcion usando reduce
const res= arr2.reduce((arr, item)=>{
    return arr +", " + (item.name)
},0)

console.log(res.substring(2))