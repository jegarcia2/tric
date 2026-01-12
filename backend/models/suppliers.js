const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suppliers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for supplier"
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Supplier name"
    },
    contactName: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Primary contact"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Supplier email"
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Supplier phone"
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Supplier category ID",
      references: {
        model: 'suppliercategories',
        key: 'id'
      }
    },
    paymentTerms: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Payment terms"
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
    tableName: 'suppliers',
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
        name: "idx_category",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
      {
        name: "fk_suppliers_created_by",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
      {
        name: "fk_suppliers_updated_by",
        using: "BTREE",
        fields: [
          { name: "updatedBy" },
        ]
      },
    ]
  });
};
