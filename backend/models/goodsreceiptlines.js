const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goodsreceiptlines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Goods receipt line ID"
    },
    goodsReceiptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Goods receipt ID",
      references: {
        model: 'goodsreceipts',
        key: 'id'
      }
    },
    purchaseOrderLineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Purchase order line ID",
      references: {
        model: 'purchaseorderlines',
        key: 'id'
      }
    },
    quantityReceived: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      comment: "Quantity received"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'goodsreceiptlines',
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
        name: "fk_goods_receipt_lines_goods_receipt",
        using: "BTREE",
        fields: [
          { name: "goodsReceiptId" },
        ]
      },
      {
        name: "fk_goods_receipt_lines_purchase_order_line",
        using: "BTREE",
        fields: [
          { name: "purchaseOrderLineId" },
        ]
      },
    ]
  });
};
