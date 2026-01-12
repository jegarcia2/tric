const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('journalentries', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for journal entry"
    },
    entryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Entry date"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Entry description"
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
    fiscalYearId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Fiscal year ID",
      references: {
        model: 'fiscalyears',
        key: 'id'
      }
    },
    reference: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Reference (invoice, PO, etc.)"
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "User who created the entry",
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
    tableName: 'journalentries',
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
        name: "fk_journal_entries_accounting_period",
        using: "BTREE",
        fields: [
          { name: "accountingPeriodId" },
        ]
      },
      {
        name: "fk_journal_entries_fiscal_year",
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
        ]
      },
      {
        name: "fk_journal_entries_created_by",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
    ]
  });
};
