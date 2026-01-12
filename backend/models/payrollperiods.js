const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payrollperiods', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique payroll period ID"
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
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Status ID",
      references: {
        model: 'statuses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'payrollperiods',
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
        name: "idx_status_id",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
    ]
  });
};
