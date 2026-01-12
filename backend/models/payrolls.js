const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payrolls', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique payroll record ID"
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Employee ID",
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    payrollPeriodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Payroll period ID",
      references: {
        model: 'payrollperiods',
        key: 'id'
      }
    },
    grossSalary: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Gross salary"
    },
    deductions: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Deductions"
    },
    netSalary: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Net salary"
    },
    taxes: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Taxes withheld"
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Payment date"
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Payment method ID",
      references: {
        model: 'paymentmethods',
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
    tableName: 'payrolls',
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
        name: "fk_payrolls_employee",
        using: "BTREE",
        fields: [
          { name: "employeeId" },
        ]
      },
      {
        name: "fk_payrolls_payroll_period",
        using: "BTREE",
        fields: [
          { name: "payrollPeriodId" },
        ]
      },
      {
        name: "fk_payrolls_payment_method",
        using: "BTREE",
        fields: [
          { name: "paymentMethodId" },
        ]
      },
    ]
  });
};
