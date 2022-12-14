const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"Recipe",
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			summary: {
				type: DataTypes.TEXT,				
			},
			healthScore: {
				type: DataTypes.INTEGER,
				  validate: {
					min: 0,
					max: 100
				}  
			},
			analyzedInstructions: {
				type: DataTypes.TEXT,
			}, 
			image: {
				type: DataTypes.STRING,
			},
			dishes:{
				type: DataTypes.STRING,
			},	
			createdByUser:{
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}		
		},
		{ timestamps: false } //con esto evito q sequelize agregue los datos del dia
	);
};
