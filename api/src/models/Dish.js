const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo Dish
	sequelize.define(
		"Dish",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.ENUM([
					"Lunch",
                    "Main course",
                    "Main dish",
                    "Dinner",
                    "Morning meal",
                    "Brunch",
                    "Breakfast",
                    "Side dish",
                    "Soup",				
					"Other"
				]),
				//allowNull: false,
			},
		},
		{ timestamps: false } //con esto evito agregue los datos de las fechas
	);
};