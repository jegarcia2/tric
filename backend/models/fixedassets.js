const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fixedassets', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the fixed asset"
    },
    assetTag: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Unique asset tag or serial number",
      unique: "assetTag"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Description of the asset"
    },
    purchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Date asset was purchased"
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true,
      comment: "Purchase price of the asset"
    },
    accumulatedDepreciation: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "Accumulated depreciation amount"
    },
    usefulLifeMonths: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Useful life in months for depreciation"
    },
    depreciationMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Method used for depreciation, e.g., straight-line"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'fixedassets',
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
        name: "assetTag",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "assetTag" },
        ]
      },
    ]
  });
};
