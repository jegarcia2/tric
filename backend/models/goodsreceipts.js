const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goodsreceipts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Goods receipt ID"
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
    receiptDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Receipt date"
    },
    receivedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User who received goods",
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
    tableName: 'goodsreceipts',
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
        name: "fk_goods_receipts_purchase_order",
        using: "BTREE",
        fields: [
          { name: "purchaseOrderId" },
        ]
      },
      {
        name: "fk_goods_receipts_received_by",
        using: "BTREE",
        fields: [
          { name: "receivedBy" },
        ]
      },
    ]
  });
};
