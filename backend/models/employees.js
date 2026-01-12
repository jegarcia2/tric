const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for employee"
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Employee first name"
    },
    secondName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Employee second name"
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Employee last name"
    },
    secondLastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Employee second last name"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Employee email address"
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Employee phone number"
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Address line 1"
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Address line 2"
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "City name"
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "State or province name"
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Date of birth"
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Hire date"
    },
    terminationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Termination date"
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Department ID",
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    jobTitle: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Job title"
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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'employees',
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
        name: "fk_employees_department",
        using: "BTREE",
        fields: [
          { name: "departmentId" },
        ]
      },
    ]
  });
};
