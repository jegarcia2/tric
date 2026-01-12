const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for role"
    },
    roleName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Role name",
      unique: "roleName"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Role description"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'roles',
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
        name: "roleName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleName" },
        ]
      },
    ]
  });
};
