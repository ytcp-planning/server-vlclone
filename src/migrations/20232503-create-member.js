"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Members", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
              },
              fullname: {
                type: Sequelize.STRING,
                allowNull: false,
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false,
              },
              password: {
                type: Sequelize.STRING,
                allowNull: false,
              },
              money: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
              },
              status: {
                  type: Sequelize.INTEGER,
                  defaultValue: 1,
              },
              role: {
                type: Sequelize.STRING,
                defaultValue: 1,
              },
              resetToken: {
                type: Sequelize.STRING,
                defaultValue: "",
              },
              expireToken: {
                type: Sequelize.DATE,
                allowNull: false,
              }
        });

        // await queryInterface.addColumn("role", {
        //   type: Sequelize.STRING,
        //   default: "student",
        // });
    },
    // async down(queryInterface, Sequelize) {
    //     await queryInterface.dropTable("Members");
    // },
};
