const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productprices', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for product price record"
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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Client ID (null means default price)",
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
      comment: "Price"
    },
    validFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: "2000-01-01",
      comment: "Start of validity"
    },
    validTo: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: "2999-12-31",
      comment: "End of validity"
    }
  }, {
    sequelize,
    tableName: 'productprices',
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
        name: "uniq_product_client_validity",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
          { name: "clientId" },
          { name: "validFrom" },
          { name: "validTo" },
        ]
      },
      {
        name: "fk_product_prices_client",
        using: "BTREE",
        fields: [
          { name: "clientId" },
        ]
      },
    ]
  });
};
