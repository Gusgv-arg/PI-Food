const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo Diets
	sequelize.define(
		"Diet",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.ENUM([
					"Vegetarian",
					"Vegan",
					"Gluten Free",
					"Dairy Free",
					"Lacto Ovo Vegetarian",
					"Paleolithic",
					"Primal",
					"Whole 30",
					"Low Fodmap",
					"Ketogenic",
					"Pescetarian",
					"Other"
				]),				
			},
		},
		{ timestamps: false } //con esto evito agregue los datos de las fechas
	);
};
