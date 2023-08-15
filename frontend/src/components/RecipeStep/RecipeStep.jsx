import { useEffect, useState } from "react";
import "./recipeStep.scss";
import { PropTypes } from "prop-types";

export default function RecipeStep({ step, setStep }) {
  const [description, setDescription] = useState("");

  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  useEffect(() => {
    setStep({ ...step, description });
  }, [description]);
  return (
    <div className="recipe-step">
      <h2 className="step-title">{`Étape ${step.stepNumber}`}</h2>
      <textarea
        className="step-description"
        value={description}
        onChange={handleDescription}
      />
    </div>
  );
}

RecipeStep.propTypes = {
  step: PropTypes.shape({
    stepNumber: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  setStep: PropTypes.func.isRequired,
};
