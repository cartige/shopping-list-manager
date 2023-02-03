const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const recipeControllers = require("./controllers/recipeControllers");
const listControllers = require("./controllers/listControllers");
const ingredientControllers = require("./controllers/ingredientControllers");

router.get("/users", userControllers.browse);
router.post("/users", userControllers.add);
router.post("/login", userControllers.verifyUser);

router.get("/recipes", recipeControllers.browse);
router.post("/recipes", recipeControllers.add);

router.get("/lists", listControllers.browse);
router.post("/lists", listControllers.add);

router.get("/ingredients", ingredientControllers.browse);
router.post("/ingredients", ingredientControllers.add);

module.exports = router;
