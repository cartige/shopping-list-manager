import { useState } from "react";
import "./ingredientForm.scss";
import PropTypes from "prop-types";
import axios from "axios";

export default function IngredientForm({
  ingredientByTypes,
  setIngredientByTypes,
  ingredientsForm,
  setIngredientsForm,
}) {
  const [ingredientToAdd, setIngredientToAdd] = useState({
    name: "",
    isSelected: false,
    IngredientTypeId: undefined,
    quantity: null,
    unit: null,
  });

  const handleIngredientForm = (evt) => {
    setIngredientToAdd({
      ...ingredientToAdd,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleIngredientFormSubmit = (evt) => {
    evt.preventDefault();
    const { name, IngredientTypeId } = ingredientToAdd;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/ingredients`, {
        name,
        IngredientTypeId,
      })
      .then(({ data: ingredientAdded }) => {
        console.log(ingredientAdded, "ingredient added");
        const { IngredientTypeId: ingAddedTypeId } = ingredientAdded;
        const { name: typeName, ingredients } = ingredientByTypes.find(
          (i) => i.id === parseInt(ingAddedTypeId, 10)
        );
        setIngredientByTypes(
          [
            ...ingredientByTypes.filter(
              ({ id }) => id !== parseInt(ingAddedTypeId, 10)
            ),
            {
              name: typeName,
              id: parseInt(ingAddedTypeId, 10),
              ingredients: [
                ...ingredients,
                {
                  name: ingredientAdded.name,
                  id: parseInt(ingredientAdded.id, 10),
                  isSelected: true,
                  IngredientType: {
                    name: typeName,
                    id: parseInt(ingAddedTypeId, 10),
                  },
                },
              ],
            },
          ].sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
          )
        );
        setIngredientToAdd({
          name: "",
          isSelected: false,
          IngredientTypeId: undefined,
        });
        setIngredientsForm([
          ...ingredientsForm,
          { id: ingredientAdded.id, quantity: 0 },
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(ingredientsForm, "ingredients form");

  return (
    <div name="add-ingredient" className="add-ingredient-form">
      <h3>L'ingredient n'est pas dans la liste ?</h3>
      <input
        type="text"
        name="name"
        value={ingredientToAdd.name}
        onChange={handleIngredientForm}
      />
      <select
        name="IngredientTypeId"
        placeholder="Ajouter un ingredient"
        onChange={handleIngredientForm}
      >
        <option value="Selectionner un rayon">Selectionner un rayon</option>
        {ingredientByTypes.map((type) => {
          return (
            <option
              value={type.id}
              key={type.id}
              id={type.id}
              name="IngredientTypeId"
            >
              {type.name}
            </option>
          );
        })}
      </select>
      <button
        type="submit"
        name="add-ingredient"
        disabled={!ingredientToAdd.name.length}
        onClick={handleIngredientFormSubmit}
      >
        Ajouter un ingredient
      </button>
    </div>
  );
}

IngredientForm.propTypes = {
  ingredientByTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      ingredients: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ).isRequired,
  setIngredientByTypes: PropTypes.func.isRequired,
  ingredientsForm: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      quantity: PropTypes.number,
      unit: PropTypes.string,
    })
  ).isRequired,
  setIngredientsForm: PropTypes.func.isRequired,
};
