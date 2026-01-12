const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for product"
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Product name"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Product description"
    },
    standardPrice: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Default price"
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Product category ID",
      references: {
        model: 'productcategories',
        key: 'id'
      }
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Unit of measure ID",
      references: {
        model: 'units',
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
    tableName: 'products',
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
        name: "fk_products_category",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
      {
        name: "fk_products_unit",
        using: "BTREE",
        fields: [
          { name: "unitId" },
        ]
      },
    ]
  });
};
