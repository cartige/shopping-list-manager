import "./listDetailsIngredient.scss";
import PropTypes from "prop-types";

export default function ListDetailsIngredient({ ingredient }) {
  return (
    <li className="list-ingredient-detail">
      <h1>{ingredient.name}</h1>
      <div>{ingredient.quantity || null}</div>
      <div>{ingredient.unit || null}</div>
    </li>
  );
}

ListDetailsIngredient.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    unit: PropTypes.string,
  }).isRequired,
};
