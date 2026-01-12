const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scheduledreports', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Scheduled report ID"
    },
    reportTemplateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Report template ID",
      references: {
        model: 'reporttemplates',
        key: 'id'
      }
    },
    scheduleCron: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Cron schedule expression"
    },
    lastRun: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Last execution time"
    },
    nextRun: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Next execution time"
    },
    recipients: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Recipients list (JSON array)"
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: "Active flag"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'scheduledreports',
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
        name: "fk_scheduled_reports_report_template",
        using: "BTREE",
        fields: [
          { name: "reportTemplateId" },
        ]
      },
    ]
  });
};
