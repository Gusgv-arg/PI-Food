import React from 'react'
import {NavLink} from "react-router-dom"
import "./Navbar.css"

function NavBar() {
  return (
    <>
    <div className='nav'>
      <div className='nav1'>
        <NavLink to="createrecipe" className="navlink">Create Recipe</NavLink>
      </div>      
      <div className='nav1'>
        <NavLink to="/home" className="navlink">Home</NavLink>
      </div>
      <div className='nav1'>
        <NavLink to="/" className="navlink">Landing</NavLink>
      </div>
          
    </div>
    </>
  )
}

export default NavBar