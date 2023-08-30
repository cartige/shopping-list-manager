import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RecipesContext from "../../../contexts/RecipesContext";
import RecipeStep from "../../RecipeStep/RecipeStep";
import DropDown from "../../DropDown/DropDown";
import IngredientForm from "../IngredientForm/IngredientForm";
import Button from "../../Button/Button";
import UserContext from "../../../contexts/UserContext";
// import IngredientsContext from "../../../contexts/IngredientsContext";
import "./recipeForm.scss";

export default function RecipeForm() {
  const { currentUser, setMyRecipes, myRecipes } = useContext(UserContext);
  const { recipes, setRecipes } = useContext(RecipesContext);
  const defaultStep = { stepNumber: 1, description: "" };
  const [step, setStep] = useState(defaultStep);
  const [steps, setSteps] = useState([{ ...step }]);
  const [ingredientByTypes, setIngredientByTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsForm, setIngredientsForm] = useState([]);
  const [recipeForm, setRecipeForm] = useState({
    name: "",
    picture: "",
    ingredients: [],
    isPublic: false,
    UserId: currentUser.user.id,
    description: "",
  });

  console.log(recipeForm, "recipe form");
  console.log(ingredientByTypes, "ingredient by types");
  const isAddRecipeBtnDisabled =
    recipeForm.name === "" && recipeForm.ingredients.length === 0;

  useEffect(() => {
    setIngredientByTypes(
      ingredientByTypes.map((iByType) => {
        if (iByType.id === ingredients[0].IngredientType.id) {
          return {
            ...iByType,
            ingredients,
          };
        }
        return iByType;
      })
    );
  }, [ingredients]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingredients`)
      .then(({ data }) => {
        setIngredientByTypes(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  const hSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/recipes`, recipeForm)
      .then(({ data: recipeAdded }) => {
        setMyRecipes([...myRecipes, recipeAdded]);
        setRecipes([...recipes, recipeAdded]);
      })
      .catch((err) => console.error(err));
  };

  const hChange = (evt) => {
    const {
      target: { checked, value, name },
    } = evt;

    if (name === "isPublic") {
      setRecipeForm({
        ...recipeForm,
        isPublic: checked,
      });
    } else {
      setRecipeForm({
        ...recipeForm,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    setRecipeForm({ ...recipeForm, ingredients: ingredientsForm });
  }, [ingredientsForm]);

  const hChangePic = (evt) => {
    setRecipeForm({
      ...recipeForm,
      picture: URL.createObjectURL(evt.target.files[0]),
    });
  };

  const handleStepAdd = () => {
    setSteps([...steps, { ...step, stepNumber: step.stepNumber + 1 }]);
    setStep({ ...defaultStep, stepNumber: step.stepNumber + 1 });
  };

  const handleStepDel = () => {
    if (steps.length) {
      setSteps(
        steps.filter(
          (myStep) => myStep.stepNumber !== steps[steps.length - 1].stepNumber
        )
      );
      if (step.stepNumber !== 0) {
        setStep({
          ...steps[steps.length - 2],
          stepNumber: step.stepNumber - 1,
        });
      }
    }
  };

  useEffect(() => {
    const stepToUpdate = steps.find((myStep) => {
      return myStep.stepNumber === step.stepNumber;
    });
    if (stepToUpdate && stepToUpdate.description !== step.description) {
      setSteps(
        [
          ...steps.filter(
            (myStep) => myStep.stepNumber !== stepToUpdate.stepNumber
          ),
          step,
        ].sort((a, b) => a.stepNumber - b.stepNumber)
      );
    }
  }, [step]);

  const handleRecipeFormSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/recipes`, recipeForm)
      .then((recipeAdded) => {
        setMyRecipes([...myRecipes, recipeAdded]);
        setRecipes([...recipes, recipeAdded]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const finalSteps = steps.filter((myStep) => myStep.description !== "");
    setRecipeForm({ ...recipeForm, RecipeStep: finalSteps });
  }, [steps]);

  return (
    <form className="recipe-form" onSubmit={hSubmit}>
      <div
        className="input-img-container"
        style={
          {
            // backgroundImage: `url(
            //   "https://media.gettyimages.com/id/531607991/fr/photo/poulet-au-beurre-poutine.jpg?s=612x612&w=0&k=20&c=-TDqcFGkP2C4BaYWfMBD7al72nkFUyQkRbfmm6xk8YM="
            // )`,
          }
        }
      >
        {/* <img
          src="https://media.gettyimages.com/id/531607991/fr/photo/poulet-au-beurre-poutine.jpg?s=612x612&w=0&k=20&c=-TDqcFGkP2C4BaYWfMBD7al72nkFUyQkRbfmm6xk8YM="
          alt="recipe-form-pic"
          className="input"
        /> */}
        <input type="file" onChange={hChangePic} />

        <input
          type="name"
          placeholder="Nom du plat..."
          name="name"
          onChange={hChange}
          value={recipeForm.name}
          className="input-name-recipe"
        />
      </div>
      <div className="recipe-form-body">
        <div className="recipe-steps-container">
          <ul className="recipe-steps">
            {steps.map((myStep) => (
              <RecipeStep
                step={myStep}
                key={myStep.stepNumber}
                setStep={setStep}
                isDisabled={myStep.stepNumber < steps.length}
              />
            ))}
          </ul>
          <div className="recipe-steps-btns">
            <Button
              type="button"
              name="recipe-step-button"
              id="recipe-step-button"
              onClick={handleStepAdd}
              disabled={step.description === ""}
            >
              Ajouter une étape
            </Button>

            <Button
              type="button"
              onClick={handleStepDel}
              disabled={steps.length === 1}
            >
              Retirer une étape
            </Button>
          </div>
        </div>

        <div className="ingredient-list-form-container">
          <h2 className="ingredient-list-form-title">Liste des ingredients</h2>

          <ul className="ingredient-list-form">
            {ingredientByTypes.map((ingredientByType) => {
              return (
                <DropDown
                  key={ingredientByType.id}
                  listName={ingredientByType.name}
                  list={ingredientByType.ingredients}
                  setIngredientsForm={setIngredientsForm}
                  ingredientsForm={ingredientsForm}
                  setIngredients={setIngredients}
                />
              );
            })}
          </ul>

          <IngredientForm
            ingredientByTypes={ingredientByTypes}
            setIngredientByTypes={setIngredientByTypes}
            ingredientsForm={ingredientsForm}
            setIngredientsForm={setIngredientsForm}
          />
        </div>
      </div>

      <div className="submit-input-container">
        <div className="checkbox-container">
          <label htmlFor="public" name="public">
            Partager la recette
          </label>

          <input type="checkbox" name="isPublic" onChange={hChange} />
        </div>
        <div className="button-container">
          <Button
            type="submit"
            name="recipe-form-button"
            id="recipe-form-button"
            onSubmit={handleRecipeFormSubmit}
            disabled={isAddRecipeBtnDisabled}
          >
            Ajouter mon plat
          </Button>
        </div>
      </div>
    </form>
  );
}
