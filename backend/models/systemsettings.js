const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('systemsettings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique system setting ID"
    },
    settingKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Setting key",
      unique: "settingKey"
    },
    settingValue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Setting value"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Setting description"
    }
  }, {
    sequelize,
    tableName: 'systemsettings',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "settingKey",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "settingKey" },
        ]
      },
    ]
  });
};
