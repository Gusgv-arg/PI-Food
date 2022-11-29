import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CREATE_RECIPE = "CREATE_RECIPE"
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const FILTER_CREATED_BY_USER = "FILTER_CREATED_BY_USER"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_HEALTH = "ORDER_BY_HEALTH"

export function getRecipes() {
	return async function (dispatch) {
		const recipesDb = await axios.get("http://localhost:3001/recipes");
		return dispatch({
			type: GET_RECIPES,
			payload: recipesDb.data,
		});
	};
}

export function getRecipeDetail(id) {
	return async function (dispatch) {
		const recipeDb = await axios.get(`http://localhost:3001/recipes/${id}`);
		return dispatch({
			type: GET_RECIPE_DETAIL,
			payload: recipeDb.data,
		});
	};
}

export function getRecipeByName(name){
	return async function(dispatch){
		try {
			const recipe= await axios.get("http://localhost:3001/recipes?title="+name)
			return dispatch({
				type: GET_RECIPE_BY_NAME,
				payload: recipe.data
			})
		} catch (error) {
			alert("Your recipe doesn´t exist")
		}
	}
}

export function filterByDiet(diet){
	return ({type: FILTER_BY_DIET, payload: diet,})
}

export function filterCreatedByUser(user){
	return ({type: FILTER_CREATED_BY_USER, payload: user})
}

export function orderByName(payload){
	return ({type: ORDER_BY_NAME, payload})
}

export function orderByHealth(payload){
	return ({type: ORDER_BY_HEALTH, payload})
}

export function createRecipe(form){
	return async function(dispatch){
		try {
			const response = await axios.post("http://localhost:3001/recipes", form)
			return await dispatch({
				type: CREATE_RECIPE,
				payload: response.data
			})
		} catch (error) {
			alert ("Recipe creation failed:", error.message)
		}
	}

}



