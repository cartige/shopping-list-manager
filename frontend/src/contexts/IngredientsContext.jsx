import { createContext, useState, useMemo, useEffect } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

const IngredientsContext = createContext({
  ingredients: [],
});
export default IngredientsContext;

export function IngredientsInfosContext({ children }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingredients`)
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const context = useMemo(
    () => ({
      ingredients,
      setIngredients,
    }),
    [ingredients, setIngredients]
  );

  return (
    <IngredientsContext.Provider value={context}>
      {children}
    </IngredientsContext.Provider>
  );
}

IngredientsInfosContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
