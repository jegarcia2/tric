const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salesorderdiscounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique ID for sales order discount record"
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
    discountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Discount ID",
      references: {
        model: 'discounts',
        key: 'id'
      }
    },
    appliedAmount: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Amount of discount applied"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'salesorderdiscounts',
    timestamps: true,
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
        name: "uniq_sales_order_discount",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "salesOrderId" },
          { name: "discountId" },
        ]
      },
      {
        name: "fk_sales_order_discounts_discount",
        using: "BTREE",
        fields: [
          { name: "discountId" },
        ]
      },
    ]
  });
};
