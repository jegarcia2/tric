const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userroles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for user role record"
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Role ID",
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Assignment timestamp"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'userroles',
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
        name: "uniq_user_role",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
          { name: "roleId" },
        ]
      },
      {
        name: "fk_user_roles_role",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
};
