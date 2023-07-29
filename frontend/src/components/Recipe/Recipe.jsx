import { BsArrowRightCircle } from "react-icons/bs";
import { PropTypes } from "prop-types";
import "./recipe.scss";

export default function Recipe({ recipe, onClick, display }) {
  return recipe ? (
    <div onClick={onClick} className="recipe-card" role="presentation">
      <div className="recipe-img-container">
        <img src={recipe.img} alt="recipe-img" className="recipe-img" />
      </div>
      <div className="recipe-card-text">
        <h2>{recipe.name}</h2>
        {display ? <BsArrowRightCircle className="arrow-recipe" /> : ""}
      </div>
    </div>
  ) : null;
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    isPublic: PropTypes.bool,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
      })
    ),
  }),
  onClick: PropTypes.func,
  display: PropTypes.bool.isRequired,
};

Recipe.defaultProps = {
  recipe: {},
  onClick: null,
};
