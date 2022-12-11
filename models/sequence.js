'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Sequence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sequence.init(
    {
      fullDefinitionLine: DataTypes.STRING,
      seqId: DataTypes.STRING,
      organismScientificName: DataTypes.STRING,
      seqTitle: DataTypes.STRING,
      molType: DataTypes.STRING,
      sequence: DataTypes.STRING,
      geneUid: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      geneId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Sequence',
      tableName: 'sequences'
    }
  )
  return Sequence
}
