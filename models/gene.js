'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Gene extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gene.init(
    {
      name: DataTypes.STRING,
      uid: DataTypes.INTEGER,
      nomeclaturename: DataTypes.STRING,
      nomenclaturestatus: DataTypes.STRING,
      description: DataTypes.STRING,
      chromosome: DataTypes.STRING,
      maplocation: DataTypes.STRING,
      summary: DataTypes.STRING,
      organismScientificName: DataTypes.STRING,
      organismCommonName: DataTypes.STRING,
      organismTaxId: DataTypes.INTEGER,
      ncbiLink: DataTypes.STRING,
      homologList: DataTypes.ARRAY,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Gene',
      tableName: 'genes'
    }
  )
  return Gene
}
