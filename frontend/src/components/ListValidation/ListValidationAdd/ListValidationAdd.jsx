import "./listValidationAdd.scss";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import units from "../../../constants/index";
import ListsContext from "../../../contexts/ListsContext";

export default function ListValidationAdd({ item, isDisplay }) {
  const { listForm, setListForm } = useContext(ListsContext);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(null);
  const [isNotANumber, setIsNotANumber] = useState(false);

  const handleUnitChange = (evt) => {
    console.log(evt.target);
    if (evt.target.value === "Unité") {
      setUnit(null);
    } else {
      setUnit(evt.target.value);
    }
  };

  const handleQuantityChange = (evt) => {
    const { value } = evt.target;
    console.log(Number.isNaN(value));
    if (value !== "") {
      if (Number.isNaN(parseInt(value[value.length - 1], 10))) {
        setIsNotANumber(true);
      } else {
        setQuantity(value);
        setIsNotANumber(false);
      }
    } else {
      setQuantity(value);
    }
  };

  //   useEffect(()=>{

  //   }, [unit, quantity])

  const hAddElementToList = () => {
    console.log(item, "element to add");
    console.log(listForm);
    const { ingredients } = listForm;
    const { IngredientType: type, id } = item;

    setListForm({
      ...listForm,
      ingredients: [
        ...ingredients,
        {
          ...item,
          quantity: parseInt(quantity, 10),
          unit,
          type,
          IngredientId: id,
        },
      ].sort((a, b) => a.id - b.id),
    });
  };
  console.log(listForm, "list form add");
  return (
    isDisplay && (
      <li className="list-item-container">
        <div className="add-item-container">
          <h3>{item.name}</h3>
          <div className="quantity-input-container">
            <input
              type="text"
              className="quantity-input"
              min="0"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

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
          <GrAdd onClick={hAddElementToList} />
        </div>

        {isNotANumber && (
          <sub className="error-message">La quantité doit être un nombre</sub>
        )}
      </li>
    )
  );
}

ListValidationAdd.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    IngredientType: PropTypes.shape({}),
  }).isRequired,
  isDisplay: PropTypes.bool.isRequired,
};
