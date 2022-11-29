import React from "react";
import {Link, useHistory} from "react-router-dom" 
import { useState } from "react";
import {useDispatch} from "react-redux"
import "./Createrecipe.css";
import { createRecipe } from "../../Redux/Actions/Actions";
import image from "./formImage.jpg"

const validate = (input)=>{
  let errors = {}
  if (!input.title){
    errors.title = "Title is invalid"
  } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ,. ]+$/.test(input.title)) {
    errors.title = "Title must ONLY include characters" 
  }

  if(!input.healthScore){
    errors.healthScore = "Recipes must have a Health Score"
  } else if (!/^([1-9][0-9]?|100)$/gm.test(input.healthScore)){
    errors.healthScore = "Health Score must be between 1 to 100" 
  }
  return errors
}

function CreateRecipe() {
	const dispatch = useDispatch()
	const history = useHistory()

	const [form, setForm] = useState({
		title: "",
		healthScore: "", 
		summary:"",
		steps:"",
		dietId: []   
	});	

	const [error, setError] = useState({
    title:"",
    healthScore:""
  	});

	const changeHandler = (e) => {
		let input = e.target.value;
		let property = e.target.name;      
		setForm({...form,	[property]: input});
    	setError(validate({...form,	[property]: input}))
     };	

	const checkHandler =(event)=>{
		if (event.target.checked){
			setForm({
				...form,
				dietId: [...form.dietId, event.target.value]
			})
		} else {
			setForm({
				...form,
				dietId: [...form.dietId.filter((diet)=>diet!==event.target.value)]
			})
		}	
	}

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(createRecipe(form))
		setForm({})
		history.push("/home")
	};

	return (
		<div>
			<div className="back-home">
				<Link to="/" className="link">Landing</Link>
				<Link to="/home" className="link">Home</Link>
			</div>
			<br />
			
			<div className="page-cont">
				<div className="recipe-cont">
					<form  onSubmit={submitHandler}>
					<h2>Post your Recipe</h2><br />
						<div>
							<label htmlFor="title">Title: </label>
							<br />
							<input
								className={error.title && "error"}
								name="title"
								type="text"
								placeholder="Type Title..."
								onChange={changeHandler}
								value={form.title}
								/>
							{error.title && <p>{error.title}</p>}
						</div>

						<div>
							<br />
							<label htmlFor="summary">Summary</label>
							<br />
							<textarea
								name="summary"
								cols="30"
								rows="2"
								type="text"
								placeholder="Summary..."
								onChange={changeHandler}
								value={form.summary}
								/>
						</div>

						<div>
							<br />
							<label htmlFor="healthScore">Health Score: </label>
							<br />
							<input
							className={error.healthScore && "error"}
							name="healthScore"
							type="text"
							onChange={changeHandler}
							value={form.healthScore}
							placeholder="From 1 to 100..."
							/>
							{error.healthScore && <p>{error.healthScore}</p>}
						</div>
						<br />

						<div>
							<label htmlFor="steps">Steps</label>
							<br />
							<textarea
							name="steps"
							cols="30"
							rows="2"
							placeholder="Steps..."
							onChange={changeHandler}
							value={form.steps}
							/>
						</div>
						
						<br />
						<label htmlFor="diets">Diets</label>
						<br />
						<ul>
							<li>
								Vegetarian
								<input
									name="Vegetarian"
									type="checkBox"
									onChange={checkHandler}
									value="1"
									/>
							</li>
							<li>
								Vegan
								<input
									name="Vegan"
									type="checkBox"
									onChange={checkHandler}
									value="2"
									/>
							</li>
							<li>
								Gluten Free
								<input
									name="GlutenFree"
									type="checkBox"
									onChange={checkHandler}
									value="3"
									/>
							</li>
							<li>
								Dairy Free
								<input
									name="DairyFree"
									type="checkBox"
									onChange={checkHandler}
									value="4"
									/>
							</li>
							<li>
								Lacto Ovo Vegetarian
								<input
									name="LactoOvoVegetarian"
									type="checkBox"
									onChange={checkHandler}
									value="5"
									/>
							</li>
							<li>
								Paleolithic
								<input
									name="Paleolithic"
									type="checkBox"
									onChange={checkHandler}
									value="6"
									/>
							</li>
							<li>
								Primal
								<input
									name="Primal"
									type="checkBox"
									onChange={checkHandler}
									value="7"
									/>
							</li>
							<li>
								Whole 30
								<input
									name="Whole30"
									type="checkBox"
									onChange={checkHandler}
									value="8"
									/>
							</li>
							<li>
								Low Fodmap
								<input
									name="LowFodmap"
									type="checkBox"
									onChange={checkHandler}
									value="9"
									/>
							</li>
							<li>
								Ketogenic
								<input
									name="Ketogenic"
									type="checkBox"
									onChange={checkHandler}
									value="10"
									/>
							</li>
							<li>
								Pescetarian
								<input
									name="Pescetarian"
									type="checkBox"
									onChange={checkHandler}
									value="11"
								/>
							</li>
							<li>
								Other
								<input
									name="Other"
									type="checkBox"
									onChange={checkHandler}
									value="12"
								/>
							</li>
						</ul>
						<br></br>
						<button
						className="button-form" 
						type="submit"
						disabled={!form.title || !form.summary || !form.healthScore || error.title || error.healthScore}
						>
						Submit Recipe
						</button>
					</form>
				</div>

				<div className="image-cont">
					<img src={image}alt="form-image" className="img-create"/> 					
				</div>
			</div>
		</div>
	);
}

export default CreateRecipe;
