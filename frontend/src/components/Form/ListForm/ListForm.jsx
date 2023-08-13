import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ListValidation from "../../ListValidation/ListValidation";
import PanelSwitcher from "../../Layouts/PanelSwitcher/PanelSwitcher";
import UserContext from "../../../contexts/UserContext";
import ListsContext from "../../../contexts/ListsContext";
import useModal from "../../useModal/useModal";
import Modal from "../../Modal/Modal";
import Recipe from "../../Recipe/Recipe";
import "./listForm.scss";

export default function ListForm({ toggleForm }) {
  const { myRecipes } = useContext(UserContext);
  const { listForm, setListForm } = useContext(ListsContext);
  const [showListDetails, setShowListDetails] = useState(false);
  const { isShowing: showCancelForm, toggle: toggleCancelForm } = useModal();
  const [recipesForList, setRecipesForList] = useState(
    myRecipes.map((recipe) => {
      return { ...recipe, isSelected: false };
    })
  );

  const handleShowListDetails = () => {
    if (showListDetails) {
      toggleCancelForm();
    } else {
      setShowListDetails(true);
    }
  };

  const hChange = (evt) => {
    if (evt.target.name === "name") {
      setListForm({
        ...listForm,
        [evt.target.name]: evt.target.value,
      });
    }
  };

  const handleCancel = (evt) => {
    if (evt.target.name === "confirm") {
      setShowListDetails(false);
    } else {
      setShowListDetails(true);
    }

    toggleCancelForm();
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

  useEffect(() => {
    if (!showListDetails) {
      setListForm({ ...listForm, ingredients: [], ingredientByTypes: [] });
      setRecipesForList(
        recipesForList.map((recipeForList) => {
          return { ...recipeForList, isSelected: false };
        })
      );
    }
  }, [showListDetails]);

  const handleCreateList = () => {
    const withoutDeletedIngredients = listForm.ingredients.filter(
      (ingredient) => !ingredient.isDeleted
    );
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/lists`, {
        ...listForm,
        ingredients: withoutDeletedIngredients,
      })
      .then(({ data }) => {
        setListForm({
          ...listForm,
          ingredientList: data.ListHasIngredients,
          id: data.id,
        });
        console.log(data, "post result");
      })
      .catch((err) => {
        console.error(err);
      });

    toggleForm();
  };
  console.log(listForm, "list form");
  return (
    listForm.UserId && (
      <form className="list-form">
        <PanelSwitcher open={showListDetails} isDisabled={false}>
          <div className="list-creation">
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
          </div>

          <ListValidation
            listForm={listForm}
            isDisplay={showListDetails}
            setListForm={setListForm}
          />
        </PanelSwitcher>
        {showListDetails ? (
          <button type="button" onClick={handleCreateList}>
            Enregistrer
          </button>
        ) : null}

        <button
          type="button"
          className={`${showListDetails ? "hide-button" : "display-button"}`}
          onClick={handleShowListDetails}
          disabled={!listForm.ingredients.length}
        >
          {showListDetails ? "Annuler" : "Aller à la Validation"}
        </button>

        <Modal
          isShowing={showCancelForm}
          hide={toggleCancelForm}
          title="Annuler"
        >
          <div>
            <h2>Êtes vous sûr de vouloir annuler ?</h2>

            <button type="button" onClick={handleCancel} name="confirm">
              Confirmer l'annulation
            </button>

            <button type="button" onClick={handleCancel} name="cancel">
              Retour à la validation
            </button>
          </div>
        </Modal>
      </form>
    )
  );
}

ListForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};
