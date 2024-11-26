"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			Comment.belongsTo(models.Project, {
				foreignKey: "projectId",
			});
			Comment.belongsTo(models.File, {
				foreignKey: "fileId",
			});
		}
	}
	Comment.init(
		{
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			fileId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			text: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 500],
				},
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			userAgent: DataTypes.STRING,
			timestamp: {
				type: DataTypes.STRING,
				validate: {
					isValidTimestamp(value) {
						if (this.type === "revision") {
							const format = /^(?:\d{2}:\d{2}|\d{2}:\d{2}:\d{2})$/;
							if (!format.test(value)) {
								throw new Error(
									'Timestamp must be in "MM:SS" or "HH:MM:SS" format.',
								);
							}
						}
					},
				},
			},
			type: {
				type: DataTypes.ENUM("revision", "feedback"),
				allowNull: false,
				defaultValue: "revision",
			},
			isCompleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Comment",
		},
	);
	return Comment;
};
