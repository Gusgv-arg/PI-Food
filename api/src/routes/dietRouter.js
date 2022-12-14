const {Router} = require("express") //requiero router
const { Diet } = require("../db"); //requiero el modelo desde db xq los exportó con sequelize.models
const dietRouter = Router(); //defino el router ejecutando el metodo router

dietRouter.get("/", async (req, res) => {
    try {
        let diets = await Diet.findAll()
        diets=await Diet.findAll()
        return res.status(200).send(diets)

    } catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = dietRouter;
