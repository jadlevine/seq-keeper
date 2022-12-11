'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class HomologousPairs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomologousPairs.init(
    {
      userId: DataTypes.INTEGER,
      geneId: DataTypes.INTEGER,
      homologId: DataTypes.INTEGER,
      orthoPara: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'HomologousPairs',
      tableName: 'homologousPairs'
    }
  )
  return HomologousPairs
}
