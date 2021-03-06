"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Color.hasMany(models.Product_Color_Image, {
        foreignKey: "product_color_id",
        as: "product_color_images",
      });
      Product_Color.hasMany(models.Product_Color_Size, {
        foreignKey: "product_color_id",
        as: "product_color_sizes",
      });
      // Product_Color.hasMany(models.Order_Item, {
      //   foreignKey: "product_color_id",
      // as:"order_item"
      // });
      Product_Color.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Product_Color.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      color: DataTypes.STRING,
      color_code: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Color",
    }
  );
  return Product_Color;
};
