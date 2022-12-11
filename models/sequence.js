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
      Sequence.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Sequence.belongsTo(models.Gene, {
        foreignKey: 'geneId'
      })
    }
  }
  Sequence.init(
    {
      fullDefinitionLine: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      seqId: DataTypes.STRING,
      organismScientificName: DataTypes.STRING,
      seqTitle: DataTypes.STRING,
      molType: DataTypes.STRING,
      sequence: DataTypes.TEXT,
      geneUid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      geneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'genes',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Sequence',
      tableName: 'sequences'
    }
  )
  return Sequence
}
