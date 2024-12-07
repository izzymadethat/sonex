"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		static associate(models) {
			Project.belongsTo(models.User, {
				foreignKey: "ownerId",
				as: "owner",
			});

			Project.hasMany(models.File, {
				foreignKey: "projectId",
				onDelete: "CASCADE",
				as: "files",
			});

			Project.hasMany(models.Comment, {
				foreignKey: "projectId",
				onDelete: "CASCADE",
				as: "comments",
			});
		}
	}
	Project.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 50],
				},
			},
			description: {
				type: DataTypes.STRING,
				validate: {
					len: [3, 250],
				},
			},
			status: {
				type: DataTypes.ENUM("active", "completed", "archived"),
				allowNull: false,
				defaultValue: "active",
			},
			paymentStatus: {
				type: DataTypes.ENUM(
					"unpaid",
					"no-charge",
					"paid",
					"partially-paid",
					"failed",
					"overpaid",
				),
				allowNull: false,
				defaultValue: "unpaid",
			},
			projectAmount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			dueDate: {
				type: {
					type: DataTypes.DATE,
					allowNull: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Project",
		},
	);
	return Project;
};
