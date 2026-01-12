const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchaseorders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the purchase order"
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Supplier ID",
      references: {
        model: 'suppliers',
        key: 'id'
      }
    },
    orderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Unique order number",
      unique: "orderNumber"
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Order date"
    },
    expectedDeliveryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Expected delivery date"
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
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User who created order",
      references: {
        model: 'users',
        key: 'id'
      }
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
    tableName: 'purchaseorders',
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
        name: "orderNumber",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderNumber" },
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
        name: "fk_purchase_orders_supplier",
        using: "BTREE",
        fields: [
          { name: "supplierId" },
        ]
      },
      {
        name: "fk_purchase_orders_created_by",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
      {
        name: "fk_purchase_orders_fiscal_year",
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
        ]
      },
      {
        name: "fk_purchase_orders_accounting_period",
        using: "BTREE",
        fields: [
          { name: "accountingPeriodId" },
        ]
      },
      {
        name: "fk_purchase_orders_journal_entry",
        using: "BTREE",
        fields: [
          { name: "journalEntryId" },
        ]
      },
    ]
  });
};
