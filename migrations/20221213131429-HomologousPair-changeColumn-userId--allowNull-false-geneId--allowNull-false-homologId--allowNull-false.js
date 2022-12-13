'use strict'

const { query } = require('express')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('homologousPairs', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }),
      queryInterface.changeColumn('homologousPairs', 'geneId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genes',
          key: 'id'
        }
      }),
      queryInterface.changeColumn('homologousPairs', 'homologId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genes',
          key: 'id'
        }
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('homologousPairs', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }),
      queryInterface.changeColumn('homologousPairs', 'geneId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'genes',
          key: 'id'
        }
      }),
      queryInterface.changeColumn('homologousPairs', 'homologId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'genes',
          key: 'id'
        }
      })
    ])
  }
}
