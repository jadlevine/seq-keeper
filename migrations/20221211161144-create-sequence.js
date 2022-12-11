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
        type: Sequelize.TEXT,
        allowNull: false
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
        type: Sequelize.TEXT
      },
      geneUid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      geneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'genes',
          key: 'id'
        }
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
