const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companyinfo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique company info ID"
    },
    companyName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Company name"
    },
    taxId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Tax ID"
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
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Phone number"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "Email address"
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Website URL"
    },
    fiscalYearStartMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "Fiscal year start month (1=January)"
    },
    timezone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "UTC",
      comment: "System timezone"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'companyinfo',
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
    ]
  });
};
