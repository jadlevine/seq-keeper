'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('sequences', 'fullDefinitionLine'),
      queryInterface.removeColumn('sequences', 'geneUid'),
      queryInterface.removeColumn('sequences', 'seqId'),
      queryInterface.addColumn('sequences', 'uid', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.renameColumn('sequences', 'seqTitle', 'title'),
      queryInterface.addColumn('sequences', 'accessionversion', {
        type: Sequelize.STRING
      }),
      queryInterface.renameColumn('sequences', 'molType', 'biomol'),
      queryInterface.addColumn('sequences', 'slen', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('sequences', 'updatedate', {
        type: Sequelize.STRING
      }),
      queryInterface.renameColumn(
        'sequences',
        'organismScientificName',
        'organism'
      ),
      queryInterface.addColumn('sequences', 'strain', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('sequences', 'taxid', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('sequences', 'subtype', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('sequences', 'subname', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('sequences', 'fasta', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('sequences', 'notes', {
        type: Sequelize.TEXT
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('sequences', 'fullDefinitionLine', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('sequences', 'geneUid', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.addColumn('sequences', 'seqId', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.removeColumn('sequences', 'uid'),
      queryInterface.renameColumn('sequences', 'title', 'seqTitle'),
      queryInterface.removeColumn('sequences', 'accessionversion'),
      queryInterface.renameColumn('sequences', 'biomol', 'molType'),
      queryInterface.removeColumn('sequences', 'slen'),
      queryInterface.removeColumn('sequences', 'updatedate'),
      queryInterface.renameColumn(
        'sequences',
        'organism',
        'organismScientificName'
      ),
      queryInterface.removeColumn('sequences', 'strain'),
      queryInterface.removeColumn('sequences', 'taxid'),
      queryInterface.removeColumn('sequences', 'subtype'),
      queryInterface.removeColumn('sequences', 'subname'),
      queryInterface.removeColumn('sequences', 'fasta'),
      queryInterface.removeColumn('sequences', 'notes')
    ])
  }
}
