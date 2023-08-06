import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiCheck } from "react-icons/fi";
import DropDownItem from "./DropDownItem/DropDownItem";
import "./dropDown.scss";

export default function DropDown({
  listName,
  list,
  setIngredientsForm,
  ingredientsForm,
  setIngredients,
}) {
  const [isExtended, setIsExtended] = useState(false);
  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    setIngredients(
      list.map((i) => {
        if (i.id === ingredient.id) {
          return { ...ingredient };
        }
        return { ...i };
      })
    );
  }, [ingredient]);
  return (
    <div className="drop-down-container">
      <div className="drop-down">
        <button
          type="button"
          className="list-name"
          onClick={() => setIsExtended(!isExtended)}
        >
          {listName}
        </button>
        {isExtended ? (
          <SlArrowUp
            onClick={() => setIsExtended(!isExtended)}
            className="list-name"
          />
        ) : (
          <SlArrowDown
            onClick={() => setIsExtended(!isExtended)}
            className="list-name"
          />
        )}
      </div>
      <div className="list-items">
        {list.map((item) => {
          return isExtended ? (
            <DropDownItem
              item={item}
              key={item.id}
              setIngredientsForm={setIngredientsForm}
              ingredientsForm={ingredientsForm}
              setIngredient={setIngredient}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}

DropDown.propTypes = {
  listName: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  setIngredientsForm: PropTypes.func.isRequired,
  ingredientsForm: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setIngredients: PropTypes.func.isRequired,
};
