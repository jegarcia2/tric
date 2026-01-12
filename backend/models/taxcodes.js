const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('taxcodes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique tax code ID"
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "Tax code, e.g., VAT, GST",
      unique: "code"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Tax description"
    },
    rate: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
      comment: "Tax rate percentage"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'taxcodes',
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
    ]
  });
};
