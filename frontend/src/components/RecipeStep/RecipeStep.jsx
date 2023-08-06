import "./recipeStep.scss";
import { PropTypes } from "prop-types";

export default function RecipeStep({ stepNumber }) {
  return (
    <div className="recipe-step">
      <h2 className="step-title">{`Étape ${stepNumber}`}</h2>
      <textarea className="step-description" />
    </div>
  );
}

RecipeStep.propTypes = {
  stepNumber: PropTypes.number.isRequired,
};
