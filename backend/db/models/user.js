"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Project, {
				foreignKey: "ownerId",
				as: "projects",
			});
			User.hasMany(models.File, {
				foreignKey: "userId",
				as: "files",
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 50],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			bio: {
				type: DataTypes.STRING,
				validate: {
					len: [3, 250],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
		},
	);
	return User;
};
