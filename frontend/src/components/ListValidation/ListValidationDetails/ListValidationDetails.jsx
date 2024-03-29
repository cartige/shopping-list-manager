import { useEffect, useState, useContext } from "react";
import "./listValidationDetails.scss";
import PropTypes from "prop-types";
import ListValidationIngredient from "./ListValidationIngredient/ListValidatonIngredient";
import ListsContext from "../../../contexts/ListsContext";

export default function ListValidationDetails({
  ingredientByType,
  setIngredients,
}) {
  const { name, ingredients: ingredientsByType } = ingredientByType;
  const [editingIngredient, setEditingIngredient] = useState({
    isBeingEdited: false,
  });
  const { listForm } = useContext(ListsContext);

  useEffect(() => {
    const { id } = editingIngredient;

    if (listForm) {
      const ingredientToEdit = listForm.ingredients.find(
        (ingredient) => id === ingredient.id
      );
      if (ingredientToEdit !== undefined) {
        if (editingIngredient.isDeleted) {
          setIngredients(
            [
              ...listForm.ingredients.filter(
                (ingredient) => ingredient.id !== id
              ),
              { ...editingIngredient },
            ].sort((a, b) => a.id - b.id)
          );
        } else if (ingredientToEdit.quantity !== editingIngredient.quantity) {
          setIngredients(
            [
              ...listForm.ingredients.filter(
                (ingredient) => ingredient.id !== id
              ),
              { ...editingIngredient, isDeleted: false },
            ].sort((a, b) => a.id - b.id)
          );
        }
      }
    }
  }, [editingIngredient]);

  return (
    <div className="list-validation-detail">
      <h1 className="type-name">{name}</h1>
      <ul className="ingredient-list">
        {ingredientsByType.map((ingredient) => {
          return (
            <div key={ingredient.id}>
              <ListValidationIngredient
                ingredient={ingredient}
                editingIngredient={editingIngredient}
                setEditingIngredient={setEditingIngredient}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

ListValidationDetails.propTypes = {
  ingredientByType: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
        type: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
      })
    ),
  }).isRequired,
  setIngredients: PropTypes.func.isRequired,
};
