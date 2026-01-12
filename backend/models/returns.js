const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('returns', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Return ID"
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Sales order ID",
      references: {
        model: 'salesorders',
        key: 'id'
      }
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Return date"
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Reason for return"
    },
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true,
      comment: "Return total"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'returns',
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
        name: "fk_returns_sales_order",
        using: "BTREE",
        fields: [
          { name: "salesOrderId" },
        ]
      },
    ]
  });
};
