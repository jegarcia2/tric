const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userpermissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for user permission record"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User ID",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Permission ID",
      references: {
        model: 'permissions',
        key: 'id'
      }
    },
    granted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "Permission granted flag"
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Assignment timestamp"
    }
  }, {
    sequelize,
    tableName: 'userpermissions',
    timestamps: false,
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
        name: "uniq_user_permission",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
          { name: "permissionId" },
        ]
      },
      {
        name: "fk_user_permissions_permission",
        using: "BTREE",
        fields: [
          { name: "permissionId" },
        ]
      },
    ]
  });
};
