'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sequences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullDefinitionLine: {
        type: Sequelize.STRING
      },
      seqId: {
        type: Sequelize.STRING
      },
      organismScientificName: {
        type: Sequelize.STRING
      },
      seqTitle: {
        type: Sequelize.STRING
      },
      molType: {
        type: Sequelize.STRING
      },
      sequence: {
        type: Sequelize.STRING
      },
      geneUid: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      geneId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sequences')
  }
}
