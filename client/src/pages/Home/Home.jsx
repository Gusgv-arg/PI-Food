import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from '../../components/Navbar/Navbar'
import Recipe from '../../components/Recipe/Recipe';
import { getRecipes, filterByDiet, filterCreatedByUser, orderByName, orderByHealth } from '../../Redux/Actions/Actions';
import Search from '../../components/Search/Search';
import PagesInHome from '../../components/PagesInHome/PagesInHome';
import "./Home.css"

function Home() {
  
  const recipesApi = useSelector((state)=>state.recipes)
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 9
  const indexLastRecipe = currentPage * recipesPerPage
  const indexFirstRecipe = indexLastRecipe - recipesPerPage
  const currentRecipes = recipesApi.slice(indexFirstRecipe, indexLastRecipe)

  const [order, setOrder] = useState("")
	
  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber);
  }

  const dispatch = useDispatch();
	
	useEffect(() => {
    dispatch(getRecipes());
	}, [dispatch]);
  
  
  const handlerClick=(event)=>{
    dispatch(getRecipes())
  }
  
  const handlerFilterByDiets =(event) =>{
    dispatch(filterByDiet(event.target.value))
    setCurrentPage(1)
  }

  const handlerFilterCreatedByUser=(event)=>{
    dispatch(filterCreatedByUser(event.target.value))
    setCurrentPage(1)
  }

  const handlerSortAZ=(event)=>{
    dispatch(orderByName(event.target.value))
    setCurrentPage(1)
    setOrder(`Ordered ${event.target.value}`)      
  }
  
  const handlerSortHealth=(event)=>{
    dispatch(orderByHealth(event.target.value))
    setCurrentPage(1)
    setOrder(`Ordered ${event.target.value}`)
  }

  return (
    <>
    <div className='home'>
      <div className='nav'>
        <NavBar/>
      </div>

      <div className='filter-container'>
        <div className='btn-home'>
          <button onClick={handlerClick}>List All Recipes</button>
        </div>

        <div className='align'>
          <h4>Alphabetical Order</h4>
          <select onChange={handlerSortAZ}>
            <option value="all">All</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        <div className='align'>
          <h4>Order by Health Score</h4>
          <select onChange={handlerSortHealth}>
            <option value="all">All</option>
            <option value="asc">Healthier</option>
            <option value="desc">Less Healthy</option>
          </select>
        </div>

        <div className='align'>
          <h4>Filter by Author</h4>
          <select onChange={handlerFilterCreatedByUser}>
            <option value="all">All</option>
            <option value="false">Api</option>      
            <option value="true">By User</option>      
          </select>
        </div>

        <div className='align'>
          <h4>Filter by Diet</h4>
          <select onChange={handlerFilterByDiets}>         	
            <option value="all">All</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten Free">Gluten Free</option>
            <option value="Dairy Free">Dairy Free</option>
            <option value="Lacto Ovo Vegetarian">Lacto Ovo Vegetarian</option>
            <option value="Paleolithic">Paleolithic</option>
            <option value="Primal">Primal</option>
            <option value="Whole 30">Whole 30</option>
            <option value="Low Fodmap">Low Fodmap</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className='search'>
        <Search
        />
      </div>

      <div className='pages-container'>
        <PagesInHome 
        recipesPerPage={recipesPerPage}
        recipesApi={recipesApi.length}
        paginado={paginado}
        />
      </div>
      <div className='recipes-container'>
        {
          currentRecipes?.map((recip)=>
          <Recipe
          title={recip.title}
          image={recip.image}
          diets={recip.Diets}
          dishes={recip.dishes}
          id={recip.id}
          key={recip.id}
          />
          )
        }
      </div>
      
    </div>
    </>
  )
}

export default Home