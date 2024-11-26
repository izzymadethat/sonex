"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Users",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				firstName: {
					type: Sequelize.STRING(50),
				},
				lastName: {
					type: Sequelize.STRING(50),
				},
				email: {
					type: Sequelize.STRING(256),
				},
				username: {
					type: Sequelize.STRING(30),
					allowNull: false,
					unique: true,
				},
				hashedPassword: {
					type: Sequelize.STRING.BINARY,
					allowNull: false,
				},
				bio: {
					type: Sequelize.STRING,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		return queryInterface.dropTable(options);
	},
};
