const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reporttemplates', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Report template ID"
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "Template name"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Template description"
    },
    templateDefinition: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Report template definition (JSON\/SQL\/XML)"
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "User ID creator",
      references: {
        model: 'users',
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
    tableName: 'reporttemplates',
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
        name: "fk_report_templates_created_by",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
    ]
  });
};
