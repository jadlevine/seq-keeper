'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('genes', 'notes', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('genes', 'description', {
        type: Sequelize.TEXT
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('genes', 'notes'),
      queryInterface.changeColumn('genes', 'description', {
        type: Sequelize.STRING
      })
    ])
  }
}
