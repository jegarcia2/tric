const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salesorders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the sales order"
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Client ID",
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User ID (salesperson)",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Order date"
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
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Total amount"
    },
    tax: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Tax amount"
    },
    discount: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Discount amount"
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
    tableName: 'salesorders',
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
        name: "fk_sales_orders_client",
        using: "BTREE",
        fields: [
          { name: "clientId" },
        ]
      },
      {
        name: "fk_sales_orders_user",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_sales_orders_fiscal_year",
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
        ]
      },
      {
        name: "fk_sales_orders_accounting_period",
        using: "BTREE",
        fields: [
          { name: "accountingPeriodId" },
        ]
      },
      {
        name: "fk_sales_orders_journal_entry",
        using: "BTREE",
        fields: [
          { name: "journalEntryId" },
        ]
      },
    ]
  });
};
