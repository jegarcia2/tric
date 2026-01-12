const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warehouses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for warehouse"
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Warehouse name"
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
      comment: "Contact phone"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'warehouses',
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
