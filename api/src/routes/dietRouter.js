const {Router} = require("express") //requiero router
const { Diet } = require("../db"); //requiero el modelo desde db xq los exportó con sequelize.models

const dietRouter = Router(); //defino el router ejecutando el metodo router

//Tipo de dietas para precargar la base de datos
//en teoria no haria falta hacer nada en esta ruta xq cuando abra la pagina 
//el useeffect la va a pegar al get y la funcion ya esta ahi
//habria q sacar el array y el bulkCreate
//let dietTypes = [{name: "Vegetarian"},{name: "Primal"},{name:"Vegan"},{name:"Gluten Free"},{name:"Dairy Free"},{name:"Lacto Ovo Vegetarian"},{name:"Paleolithic"},{name:"Whole 30"},{name:"Low Fodmap"},{name:"Ketogenic"},{name:"Pescetarian"}]

dietRouter.get("/", async (req, res) => {
    try {
        let diets = await Diet.findAll()
        //if (diets.length===0)  await Diet.bulkCreate(dietTypes)
        diets=await Diet.findAll()
        return res.status(200).send(diets)

    } catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = dietRouter;
