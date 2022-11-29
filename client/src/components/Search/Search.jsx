import React, { useEffect } from 'react'
import {useDispatch} from "react-redux"
import {useState} from "react"
import {getRecipeByName} from "../../Redux/Actions/Actions"

function Search() {
  
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    const changeHandler = (event)=>{
       setSearch(event.target.value)
    } 

    const handleClick = (event)=>{
        //event.prevent.default
        dispatch(getRecipeByName(search))
        setSearch("")
    }
    
    return (
        <div>
            <input 
            type="text"
            placeholder="Find a Recipe..."
            onChange={changeHandler}
            value={search}
            />
            <button type="submit" onClick={handleClick}>Search</button>
        </div>
    )
}

export default Search