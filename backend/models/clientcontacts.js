const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientcontacts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for client contact"
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Client ID",
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    contactName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Contact person name"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Contact email"
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Contact phone"
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Contact position"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'clientcontacts',
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
        name: "fk_client_contacts_client",
        using: "BTREE",
        fields: [
          { name: "clientId" },
        ]
      },
    ]
  });
};
