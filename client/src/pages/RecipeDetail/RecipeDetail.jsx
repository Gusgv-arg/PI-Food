import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail } from '../../Redux/Actions/Actions'
import { Link } from 'react-router-dom'
import "./RecipeDetail.css"

function RecipeDetail(props) {
  
  const id= props.match.params.id

  const dispatch = useDispatch()

  useEffect(()=>dispatch(getRecipeDetail(id)),[dispatch, id])

  const detail = useSelector((state)=>state.recipeDetail)
  

  return (
    <>
    <div className='nav'>
      <Link className="navlink" to="/home">Home</Link>
      <Link className="navlink" to="/">Landing</Link>
    </div>
    <div className='detail-container'>
      <div className='cont1'>
        <div className='cont2'>
          <span>Title: {detail.title}</span><br />
          <p>Diets: {detail.Diets && detail.Diets.map((diet)=><span>{diet.name}, </span>)}</p><br />
          <p>Dishes: {detail.dishes}</p><br />
          <p>Health Score: {detail.healthScore}</p><br />
        </div>
        <div>
          <img src={detail.image} alt=""/>
        </div>
      </div>
      <br />
      <div className='cont3'>
        <p className='und'>Summary</p>
        <p>{detail.summary?.replace(/<[^>]*>?/g,'')}</p><br />
        <p className='und'>Step by Step</p>
        <p>{detail.analyzedInstructions}</p>
      </div>
    </div>
    </>
  )
}

export default RecipeDetail