import "./recipeDetails.scss";
import { PropTypes } from "prop-types";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function RecipeDetails({ recipe, onClick }) {
  return (
    recipe && (
      <div className="recipe-details">
        <BsArrowLeftCircle className="arrow-recipe-close" onClick={onClick} />
        <div className="recipe-details-container">
          <img src={recipe.img} alt="recipe-img" className="recipe-img" />
        </div>
      </div>
    )
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    isPublic: PropTypes.bool,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
      })
    ),
  }),
  onClick: PropTypes.func,
};

RecipeDetails.defaultProps = {
  recipe: {},
  onClick: null,
};
