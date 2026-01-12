const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchaseorderlines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Purchase order line ID"
    },
    purchaseOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Purchase order ID",
      references: {
        model: 'purchaseorders',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Product ID",
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantityOrdered: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      comment: "Quantity ordered"
    },
    quantityReceived: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      defaultValue: 0.000,
      comment: "Quantity received"
    },
    unitPrice: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Unit price"
    },
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Total line amount"
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Warehouse ID",
      references: {
        model: 'warehouses',
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
    tableName: 'purchaseorderlines',
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
        name: "fk_purchase_order_lines_purchase_order",
        using: "BTREE",
        fields: [
          { name: "purchaseOrderId" },
        ]
      },
      {
        name: "fk_purchase_order_lines_product",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "fk_purchase_order_lines_warehouse",
        using: "BTREE",
        fields: [
          { name: "warehouseId" },
        ]
      },
    ]
  });
};
