const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplierinvoices', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Supplier invoice ID"
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
    invoiceNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Invoice number"
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Invoice date"
    },
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Total invoice amount"
    },
    tax: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Tax amount"
    },
    retention: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Retention amount"
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Status ID",
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Paid flag"
    },
    fiscalYearId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Fiscal year ID",
      references: {
        model: 'fiscalyears',
        key: 'id'
      }
    },
    accountingPeriodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Accounting period ID",
      references: {
        model: 'accountingperiods',
        key: 'id'
      }
    },
    journalEntryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Journal entry ID",
      references: {
        model: 'journalentries',
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
    tableName: 'supplierinvoices',
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
        name: "fk_supplier_invoices_purchase_order",
        using: "BTREE",
        fields: [
          { name: "purchaseOrderId" },
        ]
      },
      {
        name: "fk_supplier_invoices_fiscal_year",
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
        ]
      },
      {
        name: "fk_supplier_invoices_accounting_period",
        using: "BTREE",
        fields: [
          { name: "accountingPeriodId" },
        ]
      },
      {
        name: "fk_supplier_invoices_journal_entry",
        using: "BTREE",
        fields: [
          { name: "journalEntryId" },
        ]
      },
    ]
  });
};
