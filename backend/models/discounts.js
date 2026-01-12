const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique discount ID"
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Discount code",
      unique: "code"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Description of discount"
    },
    discountType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Type of discount e.g. percentage, fixed_amount"
    },
    value: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Discount value"
    },
    validFrom: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Discount validity start date"
    },
    validTo: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Discount validity end date"
    },
    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Maximum times discount can be used"
    },
    timesUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Times discount has been used"
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "If discount is active"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'discounts',
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
        name: "code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "idx_code",
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
