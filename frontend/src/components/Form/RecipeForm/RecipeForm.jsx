import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RecipeStep from "../../RecipeStep/RecipeStep";
import DropDown from "../../DropDown/DropDown";
import IngredientForm from "../IngredientForm/IngredientForm";
import Button from "../../Button/Button";
import UserContext from "../../../contexts/UserContext";
import "./recipeForm.scss";

export default function RecipeForm() {
  const { currentUser } = useContext(UserContext);
  const [stepNumber, setStepNumber] = useState(1);
  const [steps, setSteps] = useState([1]);
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

  // useEffect(() => {
  //   console.log(ingredients);
  //   debugger;
  //   setIngredientByTypes(
  //     ingredientByTypes.map((type) => {
  //       return { ...type, ingredients };
  //     })
  //   );
  // }, [ingredients]);
  console.log(currentUser, "currentUser");
  useEffect(() => {
    setIngredientByTypes(
      ingredientByTypes.map((iByType) => {
        console.log(iByType);
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
    // setRecipeForm({ ...recipeForm, UserId: currentUser.user.id });
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingredients`)
      .then(({ data }) => {
        setIngredientByTypes(data);
        // console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log(currentUser.user.id, "user id");
  }, [currentUser]);

  const hSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/recipes`, recipeForm)
      .then(({ data: recipeAdded }) => {
        console.log(recipeAdded);
      })
      .catch((err) => console.error(err));
  };

  const hChange = (evt) => {
    if (evt.target.id) {
      const {
        target: { id, checked },
      } = evt;
      console.log("pas la ???????");
      if (checked) {
        if (!ingredientsForm.some((ingredient) => ingredient.id === id))
          setIngredientsForm([...ingredientsForm, { id: parseInt(id, 10) }]);
      } else {
        setIngredientsForm(
          ingredientsForm.filter(
            (ingredient) => parseInt(id, 10) !== ingredient.id
          )
        );
      }
    } else {
      setRecipeForm({
        ...recipeForm,
        [evt.target.name]: evt.target.value,
      });
    }

    if (evt.target.name === "isPublic") {
      setRecipeForm({
        ...recipeForm,
        isPublic: evt.target.checked,
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
    // setStepNumber(stepNumber + 1);
    setSteps(steps.concat(steps[steps.length - 1] + 1));
    // setSteps(steps.filter((step) => steps[steps.length - 1] === step));
  };

  const handleStepDel = () => {
    setSteps(steps.filter((step) => steps[steps.length - 1] !== step));
    // stepst.pop();
  };

  console.log(recipeForm);
  console.log(ingredientsForm);
  console.log(ingredientByTypes, "ingredientByTypes");

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
        {/* <label htmlFor="name" name="name" className="input-name-recipe">
          Nom du plat
        </label> */}
      </div>
      <div className="recipe-form-body">
        <div className="recipe-steps-container">
          <ul className="recipe-steps">
            {steps.map((step) => (
              <RecipeStep stepNumber={step} key={step} />
            ))}
          </ul>
          <Button
            type="button"
            name="recipe-step-button"
            id="recipe-step-button"
            onClick={handleStepAdd}
          >
            Ajouter une étape
          </Button>
          <Button type="button" onClick={handleStepDel}>
            Retirer une étape
          </Button>
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
              // return (
              //   <div className="checkbox-container" key={ingredient.id}>
              //     <label htmlFor="name" name="name">
              //       {ingredient.name}
              //     </label>
              //     <input
              //       type="checkbox"
              //       name="IngredientId"
              //       value={ingredient.type}
              //       id={ingredient.id}
              //       onChange={hChange}
              //     />
              //   </div>
              // );
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

      <div className="checkbox-container">
        <label htmlFor="public" name="public">
          Public
        </label>
        <input type="checkbox" name="isPublic" onChange={hChange} />
      </div>
      <div className="button-container">
        <Button type="submit" name="recipe-form-button" id="recipe-form-button">
          Ajouter mon plat
        </Button>
      </div>
    </form>
  );
}
