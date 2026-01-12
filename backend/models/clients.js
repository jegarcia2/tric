const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for client"
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Client name"
    },
    contactName: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Client primary contact"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Client email"
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Client phone"
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Address line 1"
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Address line 2"
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "City name"
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "State or province name"
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Client status ID",
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "User who created",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "User who updated",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'clients',
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
        name: "idx_status_id",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
      {
        name: "fk_clients_created_by",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
      {
        name: "fk_clients_updated_by",
        using: "BTREE",
        fields: [
          { name: "updatedBy" },
        ]
      },
    ]
  });
};
