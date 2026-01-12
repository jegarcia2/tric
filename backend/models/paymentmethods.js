const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paymentmethods', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for payment method"
    },
    methodName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Name of the payment method, e.g. Cash, Credit Card",
      unique: "methodName"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Optional description of the payment method"
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "Indicates if the payment method is active"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'paymentmethods',
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
        name: "methodName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "methodName" },
        ]
      },
    ]
  });
};
