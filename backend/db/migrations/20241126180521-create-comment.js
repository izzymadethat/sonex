"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Comments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			fileId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Files",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			text: {
				type: Sequelize.STRING(500),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			userAgent: {
				type: Sequelize.STRING,
			},
			timestamp: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.ENUM("revision", "feedback"),
				allowNull: false,
				defaultValue: "revision",
			},
			isCompleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Comments";
		return await queryInterface.dropTable(options);
	},
};
