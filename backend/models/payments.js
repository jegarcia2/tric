const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique payment ID"
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
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Payment method ID",
      references: {
        model: 'paymentmethods',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Payment amount"
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Date of payment"
    },
    transactionRef: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Transaction reference"
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
    tableName: 'payments',
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
        name: "idx_payment_method_id",
        using: "BTREE",
        fields: [
          { name: "paymentMethodId" },
        ]
      },
      {
        name: "fk_payments_sales_order",
        using: "BTREE",
        fields: [
          { name: "salesOrderId" },
        ]
      },
      {
        name: "fk_payments_fiscal_year",
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
        ]
      },
      {
        name: "fk_payments_accounting_period",
        using: "BTREE",
        fields: [
          { name: "accountingPeriodId" },
        ]
      },
      {
        name: "fk_payments_journal_entry",
        using: "BTREE",
        fields: [
          { name: "journalEntryId" },
        ]
      },
    ]
  });
};
