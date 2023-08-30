const express = require("express");
const passport = require("passport");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const recipeControllers = require("./controllers/recipeControllers");
const listControllers = require("./controllers/listControllers");
const ingredientControllers = require("./controllers/ingredientControllers");
const userRecipeControllers = require("./controllers/userRecipesControllers");
const Auth = require("./controllers/AuthControllers");

router.get("/users", userControllers.browse);
router.post("/users", Auth.signUp);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  Auth.login
);

router.get("/recipes", recipeControllers.browse);
router.get("/recipes/:id", recipeControllers.find);
router.post("/recipes", recipeControllers.add);
router.put("/recipes/:id", recipeControllers.update);
router.delete("/recipes/:id", recipeControllers.del);

router.get("/lists", listControllers.browse);
router.get("/lists/:id", listControllers.find);
router.post("/lists", listControllers.add);
router.put("/lists/:id", listControllers.update);

router.get("/ingredients", ingredientControllers.browse);
router.post("/ingredients", ingredientControllers.add);

router.post("/user/:userId/recipes/:recipeId", userRecipeControllers.add);
router.delete("/user/:userId/recipes/:recipeId", userRecipeControllers.del);

router.use(passport.authenticate("jwt"), (req, res, next) => {
  delete req.user.password;
  next();
});

module.exports = router;
