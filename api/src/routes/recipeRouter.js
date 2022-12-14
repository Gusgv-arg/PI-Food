const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const recipeRouter = Router();
const axios = require("axios");
const { Op } = require("sequelize")

//get x query
recipeRouter.get("/", async (req, res) => {
	try {
		const { title } = req.query;

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
				
				where: { title:{[Op.iLike]:`%${title}%` } },
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
		
		const { title, summary, healthScore, image, dishes, dietId, analyzedInstructions } = req.body;
		
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
		res.status(200).send(newRecipe);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = recipeRouter;
