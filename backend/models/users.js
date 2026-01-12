const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for the user"
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "User login username",
      unique: "username"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "User email address",
      unique: "email"
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Hashed password for authentication"
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "Optional contact phone number"
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "First name of the user"
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Last name of the user"
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Primary address line"
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Secondary address line"
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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "Soft delete flag"
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
