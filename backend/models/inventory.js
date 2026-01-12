const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique inventory record"
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
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Warehouse ID",
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      defaultValue: 0.000,
      comment: "Quantity available"
    }
  }, {
    sequelize,
    tableName: 'inventory',
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
        name: "idx_product_id",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "idx_warehouse_id",
        using: "BTREE",
        fields: [
          { name: "warehouseId" },
        ]
      },
    ]
  });
};
