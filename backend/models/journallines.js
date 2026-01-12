const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('journallines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for journal line"
    },
    journalEntryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Journal entry ID",
      references: {
        model: 'journalentries',
        key: 'id'
      }
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Account ID",
      references: {
        model: 'chartofaccounts',
        key: 'id'
      }
    },
    debit: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Debit amount"
    },
    credit: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Credit amount"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Line description"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'journallines',
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
        name: "fk_journal_lines_journal_entry",
        using: "BTREE",
        fields: [
          { name: "journalEntryId" },
        ]
      },
      {
        name: "fk_journal_lines_account",
        using: "BTREE",
        fields: [
          { name: "accountId" },
        ]
      },
    ]
  });
};
