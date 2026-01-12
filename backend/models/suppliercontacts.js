const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suppliercontacts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for supplier contact"
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Supplier ID",
      references: {
        model: 'suppliers',
        key: 'id'
      }
    },
    contactName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Contact name"
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
    tableName: 'suppliercontacts',
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
        name: "fk_supplier_contacts_supplier",
        using: "BTREE",
        fields: [
          { name: "supplierId" },
        ]
      },
    ]
  });
};
