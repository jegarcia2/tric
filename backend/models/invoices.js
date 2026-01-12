const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoices', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the invoice"
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Related sales order ID",
      references: {
        model: 'salesorders',
        key: 'id'
      }
    },
    invoiceCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Invoice code"
    },
    invoiceNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Invoice number"
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Invoice issue date"
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
    retention: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Retention amount"
    },
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Total invoice amount"
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Paid status"
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
      comment: "Linked journal entry ID",
      references: {
        model: 'journalentries',
        key: 'id'
      }
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Additional details"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'invoices',
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
        name: "fk_invoices_sales_order",
        using: "BTREE",
        fields: [
          { name: "salesOrderId" },
        ]
      },
      {
        name: "fk_invoices_status",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
      {
        name: "fk_invoices_fiscal_year",
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
        ]
      },
      {
        name: "fk_invoices_accounting_period",
        using: "BTREE",
        fields: [
          { name: "accountingPeriodId" },
        ]
      },
      {
        name: "fk_invoices_journal_entry",
        using: "BTREE",
        fields: [
          { name: "journalEntryId" },
        ]
      },
    ]
  });
};
