import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import "./recipeForm.scss";

export default function RecipeForm() {
  const { currentUser } = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsForm] = useState([]);
  const [recipeForm, setRecipeForm] = useState({
    name: "",
    picture: "",
    ingredients: [],
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

  const hChange = (evt) => {
    if (evt.target.name !== "name") {
      ingredientsForm.push(evt.target.name);
    } else {
      setRecipeForm({
        ...recipeForm,
        [evt.target.name]: evt.target.value,
      });
    }
  };

  return (
    <form className="recipe-form">
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
            <div className="checkbox-container">
              <label htmlFor="name" name="name">
                {ingredient.name}
              </label>
              <input
                type="checkbox"
                name={ingredient.name}
                key={ingredient.id}
                onChange={hChange}
              />
            </div>
          );
        })}
      </ul>
    </form>
  );
}
