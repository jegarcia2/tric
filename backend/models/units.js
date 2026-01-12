const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('units', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for unit of measurement"
    },
    unitName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Name of the unit e.g., piece, kilogram, liter"
    },
    abbreviation: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "Abbreviation e.g., pc, kg, l"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'units',
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
