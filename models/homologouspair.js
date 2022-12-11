'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class HomologousPair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HomologousPair.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  HomologousPair.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      geneId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'genes',
          key: 'id'
        }
      },
      homologId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'genes',
          key: 'id'
        }
      },
      orthoPara: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'HomologousPair',
      tableName: 'homologousPairs'
    }
  )
  return HomologousPair
}
