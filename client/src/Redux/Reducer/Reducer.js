import { GET_RECIPES, GET_RECIPE_DETAIL, CREATE_RECIPE, GET_RECIPE_BY_NAME, FILTER_BY_DIET, FILTER_CREATED_BY_USER, ORDER_BY_NAME, ORDER_BY_HEALTH } from "../Actions/Actions";

import filtradoDietas from "./filtradoDietas"

export const initialState = {
	recipes: [],
	recipesAux:[],
	recipeDetail: []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return { ...state }; 

		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				recipesAux: action.payload
			};

		case GET_RECIPE_DETAIL:
			return {
				...state,
				recipeDetail: action.payload,
			};

		case CREATE_RECIPE:
			return {
				...state,
				recipes: [...state.recipes, action.payload],
				recipesAux: state.recipes
			};
		
		case GET_RECIPE_BY_NAME:
			return {
				...state,
				recipes: action.payload 
			};
		
		case FILTER_BY_DIET:
			const allDiets = state.recipesAux	
			const filteredDiet = action.payload==="all"? allDiets : (filtradoDietas(allDiets, action.payload))
			return {
				...state,
				recipes: filteredDiet
			};
		
		case FILTER_CREATED_BY_USER:
			const allRecipes = state.recipesAux
			const filteredUser = action.payload === "true" ? allRecipes.filter((el)=>el.createdByUser) : allRecipes.filter((el)=>!el.createdByUser)
			return {
				...state,
				recipes: action.payload === "all" ? state.recipesAux : filteredUser
			};

		case ORDER_BY_NAME:
			const allRecipes2 = state.recipesAux
			const resultSort = action.payload ==="asc"?
			allRecipes2.sort(function (a,b){
				if (a.title > b.title) {return 1}
				if (b.title > a.title) {return -1}
				return 0; //x si son iguales
			}) :
			allRecipes2.sort(function(a,b){
				if(a.title > b.title) {return -1}
				if(b.title > a.title) {return 1}
				return 0
			})
			return {
				...state,
				recipes: resultSort
			};
			
		case ORDER_BY_HEALTH:
			const allRecipes3 = state.recipesAux
			const resultSort2 = action.payload ==="asc"?
			allRecipes3.sort(function (a,b){
				if (a.healthScore < b.healthScore) {return 1}
				if (b.healthScore < a.healthScore) {return -1}
				return 0; //x si son iguales
			}) :
			allRecipes3.sort(function(a,b){
				if(a.healthScore < b.healthScore) {return -1}
				if(b.healthScore < a.healthScore) {return 1}
				return 0
			})
			return {
				...state,
				recipes: resultSort2
			};
	}
};

export default rootReducer