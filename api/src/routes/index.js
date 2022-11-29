const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  dietRouter  = require("./dietRouter.js");
const recipeRouter = require("./recipeRouter.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/diets", dietRouter);
router.use("/recipes", recipeRouter)

module.exports = router;
