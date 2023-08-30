import "./dropDownItem.scss";
import { FiCheck } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import units from "../../../constants/index";

export default function DropDownItem({
  item,
  setIngredientsForm,
  ingredientsForm,
  setIngredient,
}) {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(null);

  const handleIngredientsForm = () => {
    if (!item.isSelected) {
      if (
        !ingredientsForm.some(
          (ingredient) => ingredient.id === parseInt(item.id, 10)
        )
      ) {
        setIngredientsForm([
          ...ingredientsForm,
          {
            id: parseInt(item.id, 10),
            quantity: parseInt(quantity, 10),
            unit,
            name: item.name,
          },
        ]);
      }
    } else {
      setIngredientsForm(
        ingredientsForm.filter(
          (ingredient) => parseInt(item.id, 10) !== ingredient.id
        )
      );
    }
    setIngredient({ ...item, isSelected: !item.isSelected });
  };

  const handleUnitChange = (evt) => {
    if (evt.target.value === "Unité") {
      setUnit(null);
    } else {
      setUnit(evt.target.value);
    }
  };

  return (
    <div
      key={item.id}
      className={`item-info-container ${
        item.isSelected ? "selected" : "not-selected"
      }`}
    >
      <button
        type="button"
        className="item-name"
        onClick={handleIngredientsForm}
      >
        {item.name} :
      </button>
      <input
        type="number"
        className="quantity-input"
        min="0"
        name="quantity"
        value={quantity}
        onChange={(evt) => setQuantity(evt.target.value)}
      />
      <select
        name="unit"
        id="unit"
        className="unit-input"
        onChange={handleUnitChange}
      >
        <option value="Unité">Unité</option>
        {units.map((unitAvailable) => {
          return (
            <option value={unitAvailable.name} key={unitAvailable.id}>
              {unitAvailable.name}
            </option>
          );
        })}
      </select>
      {item.isSelected ? (
        <FcCheckmark onClick={handleIngredientsForm} className="icon" />
      ) : (
        <GrAdd onClick={handleIngredientsForm} className="icon" />
      )}
    </div>
  );
}

DropDownItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    isSelected: PropTypes.bool,
  }).isRequired,
  setIngredientsForm: PropTypes.func.isRequired,
  ingredientsForm: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setIngredient: PropTypes.func.isRequired,
};
