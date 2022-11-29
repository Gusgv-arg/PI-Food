require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//la BD se llama sequelize
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // para q no me muestre todo lo q hace seq.
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
//Recorre el array de las funciones de modelos y las llama pasandole la base de datos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring 
const { Recipe, Diet, Dish } = sequelize.models;

// Relación de muchos a muchos creando las tablas intermedias recipe_diet/dish
Recipe.belongsToMany(Diet, { through: 'recipe_diet'} );
Diet.belongsToMany(Recipe, { through: 'recipe_diet'} )

Recipe.belongsToMany(Dish, {through: 'recipe_dish'});
Dish.belongsToMany(Recipe, {through: 'recipe_dish'})

console.log("Modelos: ", sequelize.models)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Recipe, Diets } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
