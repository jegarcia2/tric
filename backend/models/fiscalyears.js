const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fiscalyears', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for fiscal year"
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Calendar year",
      unique: "year"
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Fiscal year start date"
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Fiscal year end date"
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Flag if fiscal year is closed"
    }
  }, {
    sequelize,
    tableName: 'fiscalyears',
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
        name: "year",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "year" },
        ]
      },
    ]
  });
};
