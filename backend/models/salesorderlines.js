const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salesorderlines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique sales order line ID"
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Sales order ID",
      references: {
        model: 'salesorders',
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
    quantity: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      comment: "Quantity ordered"
    },
    unitPrice: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Unit price"
    },
    discount: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Discount"
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
    tableName: 'salesorderlines',
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
        name: "fk_sales_order_lines_sales_order",
        using: "BTREE",
        fields: [
          { name: "salesOrderId" },
        ]
      },
      {
        name: "fk_sales_order_lines_product",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "fk_sales_order_lines_warehouse",
        using: "BTREE",
        fields: [
          { name: "warehouseId" },
        ]
      },
    ]
  });
};
