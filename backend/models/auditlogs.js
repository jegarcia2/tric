const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auditlogs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique audit log ID"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "User ID who performed action (nullable for system)",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    entityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Affected entity\/table"
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ID of the affected record"
    },
    action: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Action performed"
    },
    changes: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "JSON with old\/new values"
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Action timestamp"
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "IP address of actor"
    }
  }, {
    sequelize,
    tableName: 'auditlogs',
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
        name: "fk_audit_logs_user",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
