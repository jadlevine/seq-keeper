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
      Gene.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Gene.hasMany(models.Sequence, {
        foreignKey: 'geneId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Gene.belongsToMany(models.Gene, {
        as: 'focalGene',
        through: models.HomologousPair,
        foreignKey: 'geneId'
      })
      Gene.belongsToMany(models.Gene, {
        as: 'homolog',
        through: models.HomologousPair,
        foreignKey: 'homologId'
      })
    }
  }
  Gene.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nomenclaturename: DataTypes.STRING,
      nomenclaturestatus: DataTypes.STRING,
      description: DataTypes.TEXT,
      chromosome: DataTypes.STRING,
      maplocation: DataTypes.STRING,
      summary: DataTypes.TEXT,
      organismscientificname: DataTypes.STRING,
      organismcommonname: DataTypes.STRING,
      organismtaxid: DataTypes.INTEGER,
      ncbiLink: DataTypes.STRING,
      homologList: DataTypes.ARRAY(DataTypes.STRING),
      notes: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Gene',
      tableName: 'genes'
    }
  )
  return Gene
}
