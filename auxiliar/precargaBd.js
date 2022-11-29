const { conn, Diet, Recipe, Dish } = require("../api/src/db");
//const Dish = require("../api/src/models/Dish");
//const axios = require("axios")


//array con tipo de dietas
let dietTypes = [
	{ name: "Vegetarian" },
	{ name: "Primal" },
	{ name: "Vegan" },
	{ name: "Gluten Free" },
	{ name: "Dairy Free" },
	{ name: "Lacto Ovo Vegetarian" },
	{ name: "Paleolithic" },
	{ name: "Whole 30" },
	{ name: "Low Fodmap" },
	{ name: "Ketogenic" },
	{ name: "Pescetarian" },
	{ name: "Other" },
];

//funcion q precarga las diets
const loadDiets = async () => {
	let diets = await Diet.findAll();
	if (diets.length === 0) await Diet.bulkCreate(dietTypes);
	console.log("loadDiets from precargaBd.js");
};

//array con tipos de platos
let dishTypes= [
	{name: "Lunch"},
	{name: "Main course"},
	{name: "Main dish"},
	{name: "Dinner"},
	{name: "Morning meal"},
	{name: "Brunch"},
	{name: "Breakfast"},
	{name: "Side dish"},
	{name: "Soup"},
	{name: "Other"}]

//función que precarga los dishes
const loadDishes = async()=>{
	let dishes = await Dish.findAll();
	if (dishes.length===0) await Dish.bulkCreate(dishTypes)
	console.log("loadDishes from precargaBd.js")
}


//funcion que transforma los datos de la api para cargar BD recipes
//esta es una copia de la funcion q en realidad se ejecuta en recipeRouter
//deberia a futuro modularizar mejor
const changeObject = (ob) => {
	let newArr = [];
	for (let i = 0; i < ob.length; i++) {
		let newObj = {
			title: "",
			summary: "",
			healthScore: 0,
			analyzedInstructions: "",
			image: "",
			diets:"",
			dishes:""
		};
		for (let prop in ob[i]) {
			if (prop === "title") {
				newObj.title = ob[i].title;
			}
			if (prop === "summary") {
				newObj.summary = ob[i].summary;
			}
			if (prop === "healthScore") {
				newObj.healthScore = ob[i].healthScore;
			}
			if (prop === "analyzedInstructions") {
				newObj.analyzedInstructions = ob[i].analyzedInstructions;
				
				let data=ob[i].analyzedInstructions.flatMap((el)=>el.steps.flatMap((e)=>e.step))
console.log("ANALYZED",data.reduce((acc,item)=>acc+=item))

			}
			if (prop === "image") {
				newObj.image = ob[i].image;
			}
			if (prop === "diets") {
				newObj.diets = ob[i].diets;
				for (let j = 0; j < ob[i].diets.length; j++) {
					let item = ob[i].diets[j];
					if (item === "vegetarian") ob[i].diets[j] = 1;
					if (item === "primal") ob[i].diets[j] = 2;
					if (item === "vegan") ob[i].diets[j] = 3;
					if (item === "gluten free") ob[i].diets[j] = 4;
					if (item === "dairy free") ob[i].diets[j] = 5;
					if (item === "lacto ovo vegetarian") ob[i].diets[j] = 6;
					if (item === "paleolithic") ob[i].diets[j] = 7;
					if (item === "whole 30") ob[i].diets[j] = 8;
					if (item === "low fodmap") ob[i].diets[j] = 9;
					if (item === "ketogenic") ob[i].diets[j] = 10;
					if (item === "pescetarian") ob[i].diets[j] = 11;

					if (
						item !== "pescetarian" &&
						item !== "ketogenic" &&
						item !== "low fodmap" &&
						item !== "whole 30" &&
						item !== "paleolithic" &&
						item !== "lacto ovo vegetarian" &&
						item !== "dairy free" &&
						item !== "gluten free" &&
						item !== "vegan" &&
						item !== "primal" &&
						item !== "vegetarian"
					)
						ob[i].diets[j] = 12;
				}
			}
			
			if (prop === "dishTypes") {
				newObj.dishes = ob[i].dishTypes;
				for (let j = 0; j < ob[i].dishTypes.length; j++) {
					let item = ob[i].dishTypes[j];
					if (item === "lunch") ob[i].dishTypes[j] = 1;
					if (item === "main course") ob[i].dishTypes[j] = 2;
					if (item === "main dish") ob[i].dishTypes[j] = 3;
					if (item === "dinner") ob[i].dishTypes[j] = 4;
					if (item === "morning meal") ob[i].dishTypes[j] = 5;
					if (item === "brunch") ob[i].dishTypes[j] = 6;
					if (item === "breakfast") ob[i].dishTypes[j] = 7;
					if (item === "side dish") ob[i].dishTypes[j] = 8;
					if (item === "soup") ob[i].dishTypes[j] = 9;
					
					if (
						item !== "lunch" &&
						item !== "main course" &&
						item !== "main dish" &&
						item !== "dinner" &&
						item !== "morning meal" &&
						item !== "brunch" &&
						item !== "breakfast" &&
						item !== "side dish" &&
						item !== "soup"						
					)
						ob[i].dishTypes[j] = 10;
				}
			}

		}
		newArr.push(newObj);
	}
	return newArr;
};


//funcion que trae las recetas de la api, carga BD Recipes y crea las relaciones recipe_diet y recipe_dish
//una copia de esta funcion se esta ejecutando el recipeRouter
const loadRecipes = async () => {
	let info = await axios.get(
		"https://api.spoonacular.com/recipes/complexSearch?apiKey=25cf35c2bfc04ba3acc9b7356b361406&addRecipeInformation=true"
	);

	const bulk = changeObject(info.data.results);

	for (let i = 0; i < bulk.length; i++) {
		let newRecipe = await Recipe.create(bulk[i]);
		
		let relation = bulk[i].dietId;
		await newRecipe.addDiet(relation);
		
		let relation2 = bulk[i].dishId;
		await newRecipe.addDish(relation2)
		
		res.status(200).send(bulk);
	}
	console.log("ejecuto loadRecipes");
};

module.exports = {
	loadDiets,
	loadDishes,
	loadRecipes,
};
