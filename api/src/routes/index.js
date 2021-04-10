const { Router } = require("express");
// import all routers;
const addCategory = require("./categories/addCategory");
const allCategories = require("./categories/allCategories");
const deleteCategory = require("./categories/deleteCategory");
const putCategory = require("./categories/putCategory");
const products = require('./products/product');
const cors = require("cors");


const router = Router();
router.use(cors());

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/addCategory", addCategory);
router.use("/deleteCategory", deleteCategory);
router.use("/putCategory", putCategory);
router.use("/allCategories", allCategories);
router.use('/products', products);

module.exports = router;
