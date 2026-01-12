const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplierinvoicelines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Supplier invoice line ID"
    },
    supplierInvoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Supplier invoice ID",
      references: {
        model: 'supplierinvoices',
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
    quantityInvoiced: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      comment: "Quantity invoiced"
    },
    unitPrice: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Unit price"
    },
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Line total"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'supplierinvoicelines',
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
        name: "fk_supplier_invoice_lines_supplier_invoice",
        using: "BTREE",
        fields: [
          { name: "supplierInvoiceId" },
        ]
      },
      {
        name: "fk_supplier_invoice_lines_purchase_order_line",
        using: "BTREE",
        fields: [
          { name: "purchaseOrderLineId" },
        ]
      },
    ]
  });
};
