import "./recipeDetails.scss";
import { PropTypes } from "prop-types";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import Button from "../Button/Button";
import ListsContext from "../../contexts/ListsContext";

export default function RecipeDetails({ recipe, onClick }) {
  console.log(recipe);
  const { steps } = recipe;
  const {
    currentUser: { user },
    setMyRecipes,
    myRecipes,
  } = useContext(UserContext);
  const [isInMyRecipes, setIsInMyRecipes] = useState(
    myRecipes.find((myRecipe) => myRecipe.id === recipe.id) !== undefined
  );

  useEffect(() => {
    setIsInMyRecipes(
      myRecipes.find((myRecipe) => myRecipe.id === recipe.id) !== undefined
    );
  }, [recipe, myRecipes]);

  // const { setMyLists, myLists } = useContext(ListsContext);

  const handleRecipeAction = () => {
    if (recipe.myRecipe) {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}/recipes/${
            recipe.id
          }`
        )
        .then(({ data }) => {
          setMyRecipes(
            myRecipes
              .filter((myRecipe) => myRecipe.id !== recipe.id)
              .sort((a, b) => a.id - b.id)
          );
          console.log(data);
          debugger;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}/recipes/${
            recipe.id
          }`
        )
        .then(({ data }) => {
          setMyRecipes(
            [...myRecipes, { ...recipe, myRecipe: true }].sort(
              (a, b) => a.id - b.id
            )
          );
          console.log(data);
          debugger;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  console.log(isInMyRecipes, "izfzrefzefjzefjzefdpziefe");

  // const handleRecipeDel = () => {};

  const handleRecipeUpdate = () => {};
  return (
    recipe && (
      <div className="recipe-details">
        <BsArrowLeftCircle className="arrow-recipe-close" onClick={onClick} />
        <div className="recipe-details-container">
          <img src={recipe.img} alt="recipe-img" className="recipe-img" />
          <div className="recipe-ingredients">
            <h1 className="recipe-ingredients-title">Ingredients</h1>
            {isInMyRecipes}
            <ul className="recipe-ingredients-list">
              {recipe.Ingredients
                ? recipe.Ingredients.map((ingredient) => {
                    const { id, name, quantity, unit } = ingredient;
                    return (
                      <li
                        key={id}
                        className="recipe-ingredient-details-container"
                      >
                        {quantity && (
                          <h2 className="ingredient-quantity">{quantity}</h2>
                        )}
                        {unit && <h2 className="ingredient-unit">{unit}</h2>}
                        <h2 className="ingredient-name">{`${name}${
                          quantity > 1 && !unit ? "(s)" : ""
                        }`}</h2>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
        {steps && steps.length ? (
          <div className="recipe-steps">
            <h1 className="recipe-steps-title">
              Étapes de préparation/cuisson
            </h1>
            <ul className="recipe-steps-list">
              {recipe.steps.map((step) => {
                const { id, stepNumber, description } = step;
                return (
                  <li key={id} className="recipe-step-container">
                    <h2 className="recipe-step-title">{`Étape ${stepNumber}`}</h2>
                    <div className="recipe-step-description">{description}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        <div className="btn-recipe-details-container">
          {isInMyRecipes}
          {user && user.id === recipe.UserId ? (
            <Button
              type="button"
              className="btn-recipe-details"
              onClick={handleRecipeUpdate}
            >
              Mettre à jour
            </Button>
          ) : (
            <Button
              type="button"
              className="btn-recipe-details"
              onClick={handleRecipeAction}
            >
              {isInMyRecipes
                ? "Retirer de mes recettes"
                : "Ajouter à mes recettes"}
            </Button>
          )}
        </div>
      </div>
    )
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    isPublic: PropTypes.bool,
    description: PropTypes.string,
    UserId: PropTypes.number,
    myRecipe: PropTypes.bool,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        stepNumber: PropTypes.number,
        description: PropTypes.string,
      })
    ),
    Ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
        quantity: PropTypes.number,
        unit: PropTypes.string,
      })
    ),
  }),
  onClick: PropTypes.func,
};

RecipeDetails.defaultProps = {
  recipe: {},
  onClick: null,
};
