import "./listValidationIngredient.scss";
import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { FiSave } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

export default function ListValidationIngredient({
  ingredient,
  setEditingIngredient,
}) {
  const { id, name, quantity, unit } = ingredient;
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleQuantityChange = (evt) => {
    if (evt.target.value === "") {
      setNewQuantity(evt.target.value);
    } else {
      setNewQuantity(parseInt(evt.target.value, 10));
    }
  };

  useEffect(() => {
    console.log(ingredient, "ingredient qui doit changer");
    setNewQuantity(quantity || "");
  }, [ingredient]);

  const handleEditIngredient = () => {
    if (isEditing) {
      setEditingIngredient({
        ...ingredient,
        quantity: newQuantity,
      });
    } else {
      setNewQuantity(quantity || "");
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteIngredient = () => {
    setEditingIngredient({ ...ingredient, isDeleted: true });
  };

  return (
    <div className="ingredient-detail-container">
      <li
        key={id}
        className={`ingredient-detail ${isEditing ? "not-disable" : "disable"}`}
      >
        <h2 className="ingredient-name">{name}</h2>
        <input
          type="number"
          value={newQuantity}
          className={`ingredient-quantity-input ${
            isEditing ? "display" : "no-display"
          }`}
          name="quantity"
          onChange={handleQuantityChange}
          disabled={!isEditing}
        />
        <h2
          className={`ingredient-quantity ${
            isEditing ? "no-display" : "display"
          }`}
        >
          {newQuantity}
        </h2>
        <BiEdit
          style={{ fontSize: "1rem", cursor: "pointer" }}
          className={`${isEditing ? "no-display" : "display"}`}
          onClick={handleEditIngredient}
        />
        <FiSave
          style={{ fontSize: "1rem", cursor: "pointer" }}
          className={`${isEditing ? "display" : "no-display"}`}
          onClick={handleEditIngredient}
        />
        {unit ? <h2>{unit}</h2> : null}
        <RxCross2
          style={{ fontSize: "1rem", cursor: "pointer" }}
          onClick={handleDeleteIngredient}
        />
      </li>
      {ingredient.isDeleted ? <div className="line-through" /> : null}
    </div>
  );
}

ListValidationIngredient.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    unit: PropTypes.string,
    type: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    isDeleted: PropTypes.bool,
    isBeingEdited: PropTypes.bool,
  }).isRequired,
  setEditingIngredient: PropTypes.func.isRequired,
};
