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
import RecipeForm from "../../components/Form/RecipeForm/RecipeForm";
import useModal from "../../components/useModal/useModal";

export default function MyRecipes() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isShowing: showForm, toggle: toggleForm } = useModal();
  const [selectedRecipe, setSelectedRecipe] = useState();
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
        <PanelSwitcher open={!!selectedRecipe}>
          <div className="recipes-list">
            {myRecipes.map((myRecipe) => {
              return (
                <Recipe
                  key={myRecipe.id}
                  onClick={() => setSelectedRecipe(myRecipe)}
                  recipe={myRecipe}
                  display
                />
              );
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
