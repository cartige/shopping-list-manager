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
import useModal from "../../components/useModal/useModal";

export default function MyRecipes() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);
  const { isShowing: showForm, toggle: toggleForm } = useModal();
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [selectedMyRecipe, setSelectedMyRecipe] = useState();
  const [myRecipes, setMyRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/recipes?userId=${currentUser.id}`
      )
      .then(({ data }) => {
        setMyRecipes(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  const hLogOut = () => {
    setCurrentUser({});
    swal({
      title: "A Bientot !",
      buttons: false,
      timer: 1000,
    });
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="my-recipes">
      <NavBarLog />
      <div className="body-myrecipes">
        <Button type="button" className="main-button" onClick={toggleForm}>
          Ajouter un plat
        </Button>
        <PanelSwitcher open={!!selectedMyRecipe} isDisabled={!!selectedRecipe}>
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
            <div className="recipe-details">
              <BsArrowLeftCircle
                className="arrow-recipe-close"
                onClick={() => setSelectedMyRecipe(null)}
              />
              <div className="recipe-details-container">
                <img
                  src={selectedMyRecipe.img}
                  alt="recipe-img"
                  className="recipe-img"
                />
              </div>
            </div>
          )}
        </PanelSwitcher>
        <PanelSwitcher open={!!selectedRecipe} isDisabled={!!selectedMyRecipe}>
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
            <div className="recipe-details">
              <BsArrowLeftCircle
                className="arrow-recipe-close"
                onClick={() => setSelectedRecipe(null)}
              />
              <div className="recipe-details-container">
                <img
                  src={selectedRecipe.img}
                  alt="recipe-img"
                  className="recipe-img"
                />
              </div>
            </div>
          )}
        </PanelSwitcher>
      </div>
      <AiOutlinePoweroff className="log-out-mobile" onClick={hLogOut} />
      <Modal isShowing={showForm} hide={toggleForm} title="Ajouter un plat">
        <RecipeForm />
      </Modal>
    </div>
  );
}
