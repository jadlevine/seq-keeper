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
      uid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: DataTypes.STRING,
      accessionversion: DataTypes.STRING,
      biomol: DataTypes.STRING,
      slen: DataTypes.INTEGER,
      updatedate: DataTypes.INTEGER,
      organism: DataTypes.STRING,
      strain: DataTypes.STRING,
      taxid: DataTypes.STRING,
      subtype: DataTypes.STRING,
      subname: DataTypes.STRING,
      fasta: DataTypes.TEXT,
      notes: DataTypes.TEXT,
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
