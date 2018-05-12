'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};