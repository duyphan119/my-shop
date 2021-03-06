const Product_Controller = require("../controllers/Product_Controller");
const { getUser } = require("../middleware/Auth_Middleware");
const router = require("express").Router();

router.get("/slug/:product_slug", getUser, Product_Controller.getBySlug);
router.get("/statistics", getUser, Product_Controller.getByStatistics);
router.get(
  "/gender-category-slug/:gender_category_slug",
  getUser,
  Product_Controller.getByGenderCategorySlug
);

router.get(
  "/group-category-slug/:group_category_slug",
  getUser,
  Product_Controller.getByGroupCategorySlug
);
router.get(
  "/category-slug/:category_slug",
  getUser,
  Product_Controller.getByCategorySlug
);
router.get(
  "/collection/:collection_id",
  getUser,
  Product_Controller.getByCollectionId
);
router.get("/search", getUser, Product_Controller.search);
router.get("/", Product_Controller.getAll);
router.post("/", Product_Controller.create);
router.put("/", Product_Controller.update);
router.delete("/:id", Product_Controller._delete);

module.exports = router;
