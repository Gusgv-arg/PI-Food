const { Router } = require("express");
const { Recipe, Diet, Dish } = require("../db");
const recipeRouter = Router();
const axios = require("axios");
const {Op} = require("sequelize")

//funcion auxiliar anterior solo con diets para transformar data de la api
const changeObjectAnterior = (ob) => {
	let newArr = [];
	for (let i = 0; i < ob.length; i++) {
		let newObj = {
			title: "",
			summary: "",
			healthScore: 0,
			analyzedInstructions: "",
			image: "",
			createdByUser: false,
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
			/* if (prop==="analyzedInstructions"){
				newObj.analyzedInstructions = ob[i].analyzedInstructions
			} */
			if (prop === "image") {
				newObj.image = ob[i].image;
			}
			if (prop === "diets") {
				newObj.dietId = ob[i].diets;
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
		}
		newArr.push(newObj);
	}
	return newArr;
};

//funcion auxiliar COMPLETA para transformar data de la api
//a futuro esta funcion la tengo q tener afuera e importar 
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
				let data=ob[i].analyzedInstructions.flatMap((el)=>el.steps.flatMap((e)=>e.step))
				if (data.length>0){
					data=data.reduce((acc,item)=>acc+=item)
				} else {
					data=""
				}
				newObj.analyzedInstructions = data;
				

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
				let reduced = ob[i].dishTypes.reduce((acc,item)=>{
					acc = acc + ", " + item
					return acc.substring(2)
				},[""])
				
				if (typeof reduced === "object") reduced="";
				newObj.dishes = reduced
				//newObj.dishes = ob[i].dishTypes;
				
				/* for (let j = 0; j < ob[i].dishTypes.length; j++) {
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
				} */
			}

		}
		newArr.push(newObj);
	}
	return newArr;
	console.log("NEW ARRAY", newArr)
};

//variables para saber si hay que cargar las BD
let recipesFromApi = 0;
let dietsInDb = 0;

//get x query
recipeRouter.get("/", async (req, res) => {
	try {
		const { title } = req.query;

		//si el contador esta en 0 carga la BD
		if (recipesFromApi === 0) {
			let info = await axios.get(
				"https://api.spoonacular.com/recipes/complexSearch?apiKey=25cf35c2bfc04ba3acc9b7356b361406&addRecipeInformation=true&number=100"  //&number=100
			);
			const bulk = changeObject(info.data.results);

			for (let i = 0; i < bulk.length; i++) {
				
				let newRecipe = await Recipe.create(bulk[i]);
				let relation = bulk[i].diets;
				await newRecipe.addDiet(relation);
								
			}
			recipesFromApi++;
			return res.status(200).send(bulk);
		}

		if (!title) {
			const recipes = await Recipe.findAll(
				{
					attributes: ["id", "title","summary","healthScore", "image", "dishes", "analyzedInstructions", "createdByUser"],
					include: [
						{
							model: Diet,
							attributes: ["name"],
						},						
					],	
				}
			);
			res.status(200).send(recipes);
		} else {
			const recipes = await Recipe.findAll({
				where: { title: title },
				attributes: ["id", "title","summary","healthScore", "image", "dishes", "analyzedInstructions", "createdByUser"],
				include: [
					{
						model: Diet,
						attributes: ["name"],
					},					
				],
			});
			if (recipes.length === 0) throw new Error("There are no Recipes"); //manejo error si no hay recetas
			res.status(200).send(recipes);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

//get x params
recipeRouter.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const recipes = await Recipe.findByPk(id, {
			
			attributes: ["id", "title","summary","healthScore", "image", "dishes", "analyzedInstructions", "createdByUser"],
			include: [
				{
					model: Diet,
					attributes: ["name"],
				},				
			],
		});
		if (id) {
			return res.status(200).send(recipes);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

//post de recetas
recipeRouter.post("/", async (req, res) => {
	try {
		//const {title, summary,	healthScore, analyzedInstructions, image, createdByUser, dietId} = req.body;
		const { title, summary, healthScore, image, dishes, dietId, analyzedInstructions,dishId } = req.body;

		//const newRecipe = await Recipe.create({title, summary, healthScore,analyzedInstructions, image, createdByUser});
		const newRecipe = await Recipe.create({
			title,
			summary,
			healthScore,
			image,
			dishes,
			analyzedInstructions,
			createdByUser: true,
		});

		newRecipe.addDiet(dietId);
		//newRecipe.addDish(dishId)

		res.status(200).send(newRecipe);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = recipeRouter;
