'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('sequences', 'ncbiLink', {
        type: Sequelize.STRING
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('sequences', 'ncbiLink')])
  }
}
