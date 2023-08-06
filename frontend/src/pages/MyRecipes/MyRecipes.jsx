import "./myRecipes.scss";
import { useContext, useEffect, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Button from "../../components/Button/Button";
import PanelSwitcher from "../../components/Layouts/PanelSwitcher/PanelSwitcher";
import NavBarLog from "../../components/NavBarLog/NavBarLog";
import Recipe from "../../components/Recipe/Recipe";
import Modal from "../../components/Modal/Modal";
import UserContext from "../../contexts/UserContext";
import RecipesContext from "../../contexts/RecipesContext";
import RecipeForm from "../../components/Form/RecipeForm/RecipeForm";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import useModal from "../../components/useModal/useModal";

export default function MyRecipes() {
  const defaultRecipe = {
    id: undefined,
    name: "",
    img: null,
    isPublic: false,
    ingredients: [],
    UserId: undefined,
  };
  const { setCurrentUser, myRecipes } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);
  const { isShowing: showForm, toggle: toggleForm } = useModal();
  const [selectedRecipe, setSelectedRecipe] = useState(defaultRecipe);
  const [selectedMyRecipe, setSelectedMyRecipe] = useState(defaultRecipe);
  const [isRecipeSelected, setIsRecipeSelected] = useState(false);
  // const [, setMyRecipes] = useState([]);
  const navigate = useNavigate();

  const hLogOut = () => {
    setCurrentUser({});
    swal({
      title: "A Bientot !",
      buttons: false,
      timer: 1000,
    });
    setTimeout(() => navigate("/"), 1000);
  };

  // const isDisabled = () => {};

  const handleRecipeSelect = (stateName, recipe = defaultRecipe) => {
    if (stateName === "recipes") {
      setSelectedRecipe(recipe);
      // setIsRecipeSelected(!isRecipeSelected);
    } else {
      setSelectedMyRecipe(recipe);
      // setIsRecipeSelected(!isRecipeSelected);
    }
    // setIsRecipeSelected(false);
    // if (stateName === "recipes") {
    //   setSelectedRecipe(recipe);
    // } else {
    //   setSelectedMyRecipe(recipe);
    // }
    // setIsRecipeSelected(true);
  };

  console.log(myRecipes, "myRecipes");
  console.log(recipes, "recipes");

  return (
    <div className="my-recipes">
      <NavBarLog />
      <div className="body-myrecipes">
        <Button type="button" className="main-button" onClick={toggleForm}>
          Ajouter un plat
        </Button>

        {/* <h2 className={`${isRecipeSelected ? "display-title" : "hide-title"}`}>
          Mes Recettes
        </h2> */}
        <h2
          className={`${
            !(selectedRecipe.id || selectedMyRecipe.id)
              ? "display-title"
              : "hide-title"
          }`}
        >
          Mes Recettes
        </h2>
        {myRecipes && (
          // <h2
          //   className={`${
          //     !selectedRecipe.id ? "display-title" : "hide-title"
          //   }`}
          // >
          //   Mes Recettes
          // </h2>
          <PanelSwitcher
            open={!!selectedMyRecipe.id}
            isDisabled={!!selectedRecipe.id}
          >
            <div className="recipes-list">
              {myRecipes.map((recipe) => {
                return (
                  <Recipe
                    key={recipe.id}
                    onClick={() => setSelectedMyRecipe(recipe)}
                    recipe={recipe}
                    display
                  />
                );
              })}
            </div>

            {selectedMyRecipe && (
              // <div className="recipe-details">
              //   <BsArrowLeftCircle
              //     className="arrow-recipe-close"
              //     onClick={() => setSelectedMyRecipe(null)}
              //   />
              //   <div className="recipe-details-container">
              //     <img
              //       src={selectedMyRecipe.img}
              //       alt="recipe-img"
              //       className="recipe-img"
              //     />
              //   </div>
              // </div>
              <RecipeDetails
                onClick={() => setSelectedMyRecipe(defaultRecipe)}
                recipe={selectedMyRecipe}
              />
            )}
          </PanelSwitcher>
        )}
        <h2
          className={`${
            !(selectedRecipe.id || selectedMyRecipe.id)
              ? "display-title"
              : "hide-title"
          }`}
        >
          Toutes les recettes
        </h2>
        {recipes && (
          <PanelSwitcher
            open={!!selectedRecipe.id}
            isDisabled={!!selectedMyRecipe.id}
          >
            <div className="recipes-list">
              {recipes.map((recipe) => {
                return recipe.isPublic ? (
                  <Recipe
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    recipe={recipe}
                    display
                  />
                ) : null;
              })}
            </div>

            {selectedRecipe && (
              // <div className="recipe-details">
              //   <BsArrowLeftCircle
              //     className="arrow-recipe-close"
              //     onClick={() => setSelectedRecipe(null)}
              //   />
              //   <div className="recipe-details-container">
              //     <img
              //       src={selectedRecipe.img}
              //       alt="recipe-img"
              //       className="recipe-img"
              //     />
              //   </div>
              // </div>
              <RecipeDetails
                onClick={() => setSelectedRecipe(defaultRecipe)}
                recipe={selectedRecipe}
              />
            )}
          </PanelSwitcher>
        )}
      </div>
      <AiOutlinePoweroff className="log-out-mobile" onClick={hLogOut} />
      <Modal
        isShowing={showForm}
        hide={toggleForm}
        title="Ajouter un plat"
        headerBackground="white"
        titleColor="black"
      >
        <RecipeForm />
      </Modal>
    </div>
  );
}
