const router = require("express").Router();
const articleRoutes = require("./article");

router.use("/articles", articleRoutes);

module.exports = router;