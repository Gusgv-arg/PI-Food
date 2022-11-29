import React from 'react'
import {NavLink} from "react-router-dom"
import "./Recipe.css"

function Recipe({id, title, image, summary, healthScore, diets, dishes}) {
  

  return (
    <>
    
      <div className='Recip-Container'>
        <p>Title: {title}</p><br />
        <img src={image} alt="" /><br />
        <p>Dishes: {dishes}</p><br />
        <p>Diets: {diets.map(diet=><span key={diet.recipe_diet.Recipe_Id}>{diet.name}, </span>)}</p> <br />
        <NavLink to={`/recipedetail/${id}`}>Details</NavLink>
      </div>  
    
    </>
  )
}

export default Recipe