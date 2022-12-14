import React from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css"

function Landing() {
	return (
		
		<div className="landing">
			<div>
				<h1>Individual Project: "Henry Food"</h1>
				<h3>Author: Gustavo Gómez Villafañe</h3>
			</div> <br />
			
			<div className="text">This individual project is part of my studies in Henry's Bootcamp.<br />
			It's my first full-stack application that consists of bringing <br />
			food Recipes provided by http://www.spoonacular.com <br />
			<br /> 
			Technologies used: <br />
			1. Postgre SQL <br />
			2. Sequelize <br />
			3. Node <br /> 
			4. React <br />
			5. Redux <br />
			6. CSS <br />
			</div> <br />
			
			<NavLink to="/home" >
            	<button className="btn-land">Enter Page</button>
          	</NavLink>			
		</div>  
	);
}

export default Landing;
