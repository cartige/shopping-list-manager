import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import Recipe from "../../Recipe/Recipe";
import "./listForm.scss";

export default function ListForm() {
  const { currentUser, myRecipes } = useContext(UserContext);
  const [listForm, setListForm] = useState({
    UserId: currentUser.user.id,
    name: "",
    ingredients: [],
  });
  const [recipesForList, setRecipesForList] = useState(
    myRecipes.map((recipe) => {
      return { ...recipe, isSelected: false };
    })
  );
  // const { recipes } = useContext(RecipesContext);
  // const [recipes, setRecipes] = useState([]);
  console.log(recipesForList);

  const hChange = (evt) => {
    if (evt.target.name === "name") {
      setListForm({
        ...listForm,
        [evt.target.name]: evt.target.value,
      });
    }
  };

  const handleListForm = (recipe) => {
    setRecipesForList(
      recipesForList.map((recipeForList) => {
        if (recipeForList.id === recipe.id) {
          return { ...recipeForList, isSelected: !recipeForList.isSelected };
        }
        return recipeForList;
      })
    );

    const { ingredients } = listForm;

    if (recipe.isSelected) {
      setListForm({
        ...listForm,
        ingredients: ingredients.filter(
          (ingredient) => ingredient.recipeId !== parseInt(recipe.id, 10)
        ),
      });
    } else {
      const { Ingredients } = recipe;
      const addRecipeIdToIng = Ingredients.map((ingredient) => {
        return { ...ingredient, recipeId: parseInt(recipe.id, 10) };
      });

      setListForm({
        ...listForm,
        ingredients: ingredients.concat(addRecipeIdToIng),
      });
    }
  };
  console.log(listForm, "list form");
  return (
    <form className="list-form">
      <div className="input-list-container">
        <label htmlFor="name" className="input-name-list">
          Nom de la liste
        </label>
        <input
          placeholder="nom"
          name="name"
          value={listForm.name}
          onChange={hChange}
          className="input-list-form"
        />
      </div>

      <ul className="recipe-list">
        {recipesForList.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              display={false}
              onClick={() => handleListForm(recipe)}
              recipe={recipe}
              isMakingList
            />
          );
        })}
      </ul>
    </form>
  );
}
