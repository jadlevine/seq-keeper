'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nomeclaturename: {
        type: Sequelize.STRING
      },
      nomenclaturestatus: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      chromosome: {
        type: Sequelize.STRING
      },
      maplocation: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.TEXT
      },
      organismScientificName: {
        type: Sequelize.STRING
      },
      organismCommonName: {
        type: Sequelize.STRING
      },
      organismTaxId: {
        type: Sequelize.INTEGER
      },
      ncbiLink: {
        type: Sequelize.STRING
      },
      homologList: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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
    await queryInterface.dropTable('genes')
  }
}
