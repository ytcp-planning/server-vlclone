"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Members", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fullname: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            money: {
                type: Sequelize.INTEGER,
            },
            bio: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.STRING,
                default: "member",
            },
            expired_token: {
                type: Sequelize.STRING
            }
        });

        // await queryInterface.addColumn("role", {
        //   type: Sequelize.STRING,
        //   default: "student",
        // });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Members");
    },
};
