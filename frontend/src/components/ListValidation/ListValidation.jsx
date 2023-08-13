import { useContext, useEffect, useState } from "react";
import "./listValidation.scss";
import PropTypes from "prop-types";
import ListValidationDetails from "./ListValidationDetails/ListValidationDetails";
import ListsContext from "../../contexts/ListsContext";

export default function ListValidation({ isDisplay }) {
  const { listForm, setListForm } = useContext(ListsContext);
  const [editingIngredients, setEditingIngredients] = useState(
    listForm.ingredients
  );

  const mapIngredientsByType = (ingredientsToMap) => {
    const ingredientByTypes = [];
    let currentType = { id: undefined, name: "", ingredients: [] };
    ingredientsToMap.sort((a, b) => a.type.id - b.type.id);
    ingredientsToMap.forEach((ingredient, index) => {
      const {
        type: { id },
      } = ingredient;
      if (
        ingredientsToMap[index + 1] &&
        ingredientsToMap[index + 1].type.id === id
      ) {
        currentType.name = ingredient.type.name;
        currentType.id = ingredient.type.id;
        currentType.ingredients.push(ingredient);
      } else {
        currentType.name = ingredient.type.name;
        currentType.id = ingredient.type.id;
        currentType.ingredients.push(ingredient);
        ingredientByTypes.push(currentType);
        currentType = { id: undefined, name: "", ingredients: [] };
      }
    });
    return ingredientByTypes;
  };

  const groupIngredientByUnitAndQuantity = (ingredientsToGroup) => {
    let currentIngredient = { quantity: 0, unit: null, id: undefined };
    const ingredientsGrouped = [];
    ingredientsToGroup.sort((a, b) => a.id - b.id);
    ingredientsToGroup.forEach((ingredient, index) => {
      if (
        ingredientsToGroup[index + 1] &&
        ingredientsToGroup[index + 1].id === ingredient.id
      ) {
        if (ingredientsToGroup[index + 1].unit === ingredient.unit) {
          const { quantity } = currentIngredient;
          const { quantity: newQuantity, unit } = ingredient;
          currentIngredient = {
            ...ingredient,
            quantity: quantity + newQuantity,
            unit,
            IngredientId: ingredient.id,
          };
        } else if (currentIngredient.quantity) {
          ingredientsGrouped.push({
            ...currentIngredient,
            quantity: currentIngredient.quantity + ingredient.quantity,
          });
          currentIngredient = { quantity: 0, unit: "", id: undefined };
        }
      } else if (currentIngredient.id === ingredient.id) {
        ingredientsGrouped.push({
          ...currentIngredient,
          quantity: currentIngredient.quantity + ingredient.quantity,
        });
        currentIngredient = { quantity: 0, unit: "", id: undefined };
      } else if (currentIngredient.quantity) {
        ingredientsGrouped.push({
          ...currentIngredient,
          quantity: currentIngredient.quantity + ingredient.quantity,
        });
        ingredientsGrouped.push({
          ...ingredient,
          IngredientId: ingredient.id,
        });
        currentIngredient = { quantity: 0, unit: "", id: undefined };
      } else {
        ingredientsGrouped.push({
          ...ingredient,
          IngredientId: ingredient.id,
        });
      }
    });
    return ingredientsGrouped;
  };

  useEffect(() => {
    if (isDisplay) {
      const ingredientsGrouped = groupIngredientByUnitAndQuantity(
        listForm.ingredients
      );
      const ingredientByTypes = mapIngredientsByType(ingredientsGrouped);

      setListForm({
        ...listForm,
        ingredientByTypes,
        ingredients: ingredientsGrouped,
      });
    }
  }, [isDisplay]);

  useEffect(() => {
    if (isDisplay) {
      const ingredientByTypes = mapIngredientsByType(editingIngredients);
      setListForm({ ...listForm, ingredientByTypes });
      setListForm({ ...listForm, ingredients: editingIngredients });
    }
  }, [editingIngredients]);

  return (
    <div className="list-validation-container">
      <h1 className="list-validation-title">Récapitulatif</h1>

      <h2 className="final-list-name">{listForm.name}</h2>

      <div>
        <ul className="list-validation-details">
          {listForm.ingredientByTypes.map((type) => {
            const { id } = type;
            return (
              <div key={id} className="list-validation-detail-container">
                <ListValidationDetails
                  ingredientByType={type}
                  ingredients={editingIngredients}
                  setIngredients={setEditingIngredients}
                />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

ListValidation.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
};
