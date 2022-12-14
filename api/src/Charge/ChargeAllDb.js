const axios = require("axios");
const {	REACT_APP_API_KEY } = process.env;
const {Diet, Recipe} = require("../db")

const changeObject = (ob) => {
	let newArr = [];
	
	for (let i = 0; i < ob.length; i++) {
		let newObj = {
			title: "",
			summary: "",
			healthScore: 0,
			analyzedInstructions: "",
			image: "",
			diets: "",
			dishes: "",
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
				let data = ob[i].analyzedInstructions.flatMap((el) =>
					el.steps.flatMap((e) => e.step)
				);
				if (data.length > 0) {
					data = data.reduce((acc, item) => (acc += item));
				} else {
					data = "";
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
				let reduced = ob[i].dishTypes.reduce(
					(acc, item) => {
						acc = acc + ", " + item;
						return acc.substring(2);
					},
					[""]
				);

				if (typeof reduced === "object") reduced = "";
				newObj.dishes = reduced;
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
	
};

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

//funcion q precarga las diets y las recetas
const loadDb = async () => {
    //carga de Diets
    let diets = await Diet.findAll();
	if (diets.length === 0) await Diet.bulkCreate(dietTypes);
    
    //carga de Recipes
    let info = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_API_KEY}&addRecipeInformation=true&number=100`
        );
        const bulk = changeObject(info.data.results);
        
        for (let i = 0; i < bulk.length; i++) {
            let newRecipe = await Recipe.create(bulk[i]);
            
            let relation = bulk[i].diets;
            await newRecipe.addDiet(relation);
        }
        
        console.log("loadDB from ChargeAllDb.js");
    };
    
module.exports = {
	loadDb,
};