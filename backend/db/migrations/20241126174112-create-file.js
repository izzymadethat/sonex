"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Files",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				type: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				projectId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Projects",
						key: "id",
					},
					onDelete: "CASCADE",
				},
				userId: {
					type: Sequelize.INTEGER,
					references: {
						model: "Users",
						key: "id",
					},
					onDelete: "CASCADE",
				},
				path: {
					type: Sequelize.STRING,
				},
				size: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				isDownloadable: {
					type: Sequelize.BOOLEAN,
					defaultValue: true,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			options,
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Files";
		return await queryInterface.dropTable(options);
	},
};
