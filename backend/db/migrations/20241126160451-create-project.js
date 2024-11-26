'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull:false,
        unique: true
      },
      description: {
        type: Sequelize.STRING(250)
      },
      status: {
        type: Sequelize.ENUM("active", "completed", "archived"),
        defaultValue: "active"
      },
      paymentStatus: {
        type: Sequelize.ENUM("unpaid",
				"no-charge",
				"paid",
				"partially-paid",
				"failed",
				"overpaid"),
        allowNull: false,
        defaultValue: "unpaid"
      },
      projectAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Projects";
		return queryInterface.dropTable(options);
  }
};