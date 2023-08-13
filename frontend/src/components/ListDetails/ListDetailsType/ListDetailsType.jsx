import "./listDetailsType.scss";
import PropTypes from "prop-types";
import ListDetailsIngredient from "./ListDetailsIngredient/ListDetailsIngredient";

export default function ListDetailsType({ type }) {
  return (
    <div className="list-ingredient-by-type-container">
      <h1 className="list-type">{type.name}</h1>
      <ul className="list-ingredients-container">
        {type.ingredients.map((ingredient) => {
          return (
            <div key={ingredient.id}>
              <ListDetailsIngredient ingredient={ingredient} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

ListDetailsType.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      })
    ),
  }).isRequired,
};
