import { BsArrowRightCircle } from "react-icons/bs";
import { PropTypes } from "prop-types";
import "./recipe.scss";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Recipe({
  recipe,
  onClick,
  display,
  isMakingList,
  isAllRecipes,
}) {
  const {
    currentUser: { user },
  } = useContext(UserContext);
  const selectedClass = recipe.isSelected ? "selected" : "not-selected";
  const myRecipeClass = recipe.myRecipe ? "recipe-my-recipe" : "";
  const chooseClass =
    user && recipe.UserId === user.id ? "recipe-owned" : myRecipeClass;
  const className = `${isMakingList ? selectedClass : ""} ${
    isAllRecipes ? chooseClass : ""
  }`;

  console.log(recipe, "recipe in recipe");

  return recipe ? (
    <div
      onClick={onClick}
      className={`recipe-card ${className}`}
      role="presentation"
    >
      <div className="recipe-img-container">
        <img src={recipe.img} alt="recipe-img" className="recipe-img" />
      </div>

      <div className="recipe-card-text">
        <h2>{recipe.name}</h2>
        {display ? <BsArrowRightCircle className="arrow-recipe" /> : ""}
      </div>
    </div>
  ) : null;
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    isPublic: PropTypes.bool,
    isSelected: PropTypes.bool,
    description: PropTypes.string,
    UserId: PropTypes.number,
    myRecipe: PropTypes.bool,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
      })
    ),
  }),
  onClick: PropTypes.func,
  display: PropTypes.bool.isRequired,
  isMakingList: PropTypes.bool,
  isAllRecipes: PropTypes.bool,
};

Recipe.defaultProps = {
  recipe: {},
  onClick: null,
  isMakingList: false,
  isAllRecipes: false,
};
