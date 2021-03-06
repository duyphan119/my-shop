const Gender_Category_Router = require("./Gender_Category_Router");
const Group_Category_Router = require("./Group_Category_Router");
const Category_Router = require("./Category_Router");
const Product_Router = require("./Product_Router");
const Auth_Router = require("./Auth_Router");
const Comment_Router = require("./Comment_Router");
const Product_Color_Router = require("./Product_Color_Router");
const Product_Color_Image_Router = require("./Product_Color_Image_Router");
const Product_Color_Size_Router = require("./Product_Color_Size_Router");
const Cart_Item_Router = require("./Cart_Item_Router");
const Collection_Router = require("./Collection_Router");
const Collection_Item_Router = require("./Collection_Item_Router");
const Order_Router = require("./Order_Router");
const Product_User_Router = require("./Product_User_Router");
const Upload_Router = require("./Upload_Router");
const User_Router = require("./User_Router");
const Replied_Comment_Router = require("./Replied_Comment_Router");

const configRoute = (app) => {
  app.use("/v1/api/gender-category", Gender_Category_Router);
  app.use("/v1/api/auth", Auth_Router);
  app.use("/v1/api/order", Order_Router);
  app.use("/v1/api/group-category", Group_Category_Router);
  app.use("/v1/api/category", Category_Router);
  app.use("/v1/api/product-color", Product_Color_Router);
  app.use("/v1/api/product-color-image", Product_Color_Image_Router);
  app.use("/v1/api/product-color-size", Product_Color_Size_Router);
  app.use("/v1/api/user", User_Router);
  app.use("/v1/api/product", Product_Router);
  app.use("/v1/api/upload", Upload_Router);
  app.use("/v1/api/cart", Cart_Item_Router);
  app.use("/v1/api/product-user", Product_User_Router);
  app.use("/v1/api/comment", Comment_Router);
  app.use("/v1/api/replied-comment", Replied_Comment_Router);
  app.use("/v1/api/collection", Collection_Router);
  app.use("/v1/api/collection-item", Collection_Item_Router);
};
module.exports = configRoute;
