"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await User.create({
			firstName: "Demo",
			lastName: "User",
			email: "demo@sonexaudio.app",
			username: "demo-user",
			hashedPassword: bcrypt.hashSync("password"),
		});
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ["demo-user"] },
			},
			{}
		);
	},
};
