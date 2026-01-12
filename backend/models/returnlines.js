const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('returnlines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Return line ID"
    },
    returnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Return ID",
      references: {
        model: 'returns',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Product ID",
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      comment: "Returned quantity"
    },
    unitPrice: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Unit price"
    },
    total: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true,
      comment: "Total amount"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'returnlines',
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
        name: "fk_return_lines_return",
        using: "BTREE",
        fields: [
          { name: "returnId" },
        ]
      },
      {
        name: "fk_return_lines_product",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
};
