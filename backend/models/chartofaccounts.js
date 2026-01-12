const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chartofaccounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the account"
    },
    accountCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "Account code e.g., 1000, 2000-01",
      unique: "accountCode"
    },
    accountName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Name of the account"
    },
    accountType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Type of account e.g., Asset, Liability, Equity, Revenue, Expense"
    },
    parentAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Self-reference for hierarchical accounts",
      references: {
        model: 'chartofaccounts',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Account description"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'chartofaccounts',
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
        name: "accountCode",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accountCode" },
        ]
      },
      {
        name: "fk_chart_of_accounts_parent_account",
        using: "BTREE",
        fields: [
          { name: "parentAccountId" },
        ]
      },
    ]
  });
};
