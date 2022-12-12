'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn(
        'genes',
        'nomeclaturename',
        'nomenclaturename'
      ),
      queryInterface.renameColumn(
        'genes',
        'organismCommonName',
        'organismcommonname'
      ),
      queryInterface.renameColumn(
        'genes',
        'organismScientificName',
        'organismscientificname'
      ),
      queryInterface.renameColumn('genes', 'organismTaxId', 'organismtaxid')
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn(
        'genes',
        'nomenclaturename',
        'nomeclaturename'
      ),
      queryInterface.renameColumn(
        'genes',
        'organismcommonname',
        'organismCommonName'
      ),
      queryInterface.renameColumn(
        'genes',
        'organismscientificname',
        'organismScientificName'
      ),
      queryInterface.renameColumn('genes', 'organismtaxid', 'organismTaxId')
    ])
  }
}
