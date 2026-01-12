const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for permission"
    },
    permissionName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Permission name",
      unique: "permissionName"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Permission description"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'permissions',
    timestamps: true,
    paranoid: true,
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
        name: "permissionName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "permissionName" },
        ]
      },
    ]
  });
};
