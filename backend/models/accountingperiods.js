const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accountingperiods', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for accounting period"
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
    periodNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Period number (1=January, etc.)"
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Period start date"
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Period end date"
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Flag if period is closed"
    }
  }, {
    sequelize,
    tableName: 'accountingperiods',
    timestamps: true,
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
        name: "uniq_fiscal_year_period",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fiscalYearId" },
          { name: "periodNumber" },
        ]
      },
    ]
  });
};
