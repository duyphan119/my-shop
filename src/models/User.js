"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "comments",
      });
      User.hasMany(models.Replied_Comment, {
        foreignKey: "user_id",
        as: "replied_comments",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orders",
      });
      User.hasMany(models.Product_User, {
        foreignKey: "user_id",
        as: "product_users",
      });
      User.hasMany(models.Cart_Item, {
        foreignKey: "user_id",
        as: "cart_items",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
