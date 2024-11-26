"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class File extends Model {
		static associate(models) {
			File.belongsTo(models.Project, {
				foreignKey: "projectId",
				as: "project",
			});
			File.belongsTo(models.User, {
				foreignKey: "userId",
				as: "user",
			});
			File.hasMany(models.Comment, {
				foreignKey: "fileId",
				as: "files",
			});
		}
	}
	File.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			path: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			isDownloadable: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "File",
		},
	);
	return File;
};
