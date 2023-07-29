import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "../../Button/Button";
import UserContext from "../../../contexts/UserContext";
import "./recipeForm.scss";

export default function RecipeForm() {
  const { currentUser } = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsForm, setIngredientsForm] = useState([]);
  const [recipeForm, setRecipeForm] = useState({
    name: "",
    picture: "",
    ingredients: [],
    isPublic: false,
    UserId: currentUser.id,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingredients`)
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  const hSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/recipes`, recipeForm)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const hChange = (evt) => {
    console.log(evt.target.value);
    console.log(ingredientsForm, "before");
    debugger;

    if (evt.target.id) {
      const {
        target: { id, checked },
      } = evt;
      console.log(checked);
      if (checked) {
        console.log(
          !ingredientsForm.some((ingredient) => ingredient.id === id)
        );
        debugger;
        if (!ingredientsForm.some((ingredient) => ingredient.id === id))
          ingredientsForm.push({
            [evt.target.name]: parseInt(id, 10),
          });
      } else {
        setIngredientsForm(
          ingredientsForm.filter((ingredient) => {
            console.log(ingredient);
            console.log(id);
            return parseInt(id, 10) !== ingredient.IngredientId;
          })
        );
        debugger;
      }
    } else {
      setRecipeForm({
        ...recipeForm,
        [evt.target.name]: evt.target.value,
      });
    }
    console.log(ingredientsForm, "after");
  };

  useEffect(() => {
    setRecipeForm({ ...recipeForm, ingredients: ingredientsForm });
    console.log(recipeForm);
  }, [ingredientsForm]);

  console.log(ingredients);

  return (
    <form className="recipe-form" onSubmit={hSubmit}>
      <div className="input-recipe-container">
        <label htmlFor="name" name="name" className="input-name-recipe">
          Nom du plat
        </label>
        <input
          type="name"
          placeholder="..."
          name="name"
          onChange={hChange}
          value={recipeForm.name}
          className="input-recipe-form"
        />
      </div>

      <ul className="ingredient-list-form">
        {ingredients.map((ingredient) => {
          return (
            <div className="checkbox-container" key={ingredient.id}>
              <label htmlFor="name" name="name">
                {ingredient.name}
              </label>
              <input
                type="checkbox"
                name="IngredientId"
                value={ingredient.type}
                id={ingredient.id}
                onChange={hChange}
              />
            </div>
          );
        })}
      </ul>
      <div className="button-container">
        <div className="checkbox-container">
          <label htmlFor="private" name="private">
            Privée
          </label>
          <input type="checkbox" name="isPublic" onChange={hChange} />
        </div>
        <Button type="submit" name="recipe-form-button" id="recipe-form-button">
          Ajouter mon plat
        </Button>
      </div>
    </form>
  );
}
