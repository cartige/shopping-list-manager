import { createContext, useState, useMemo, useEffect } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

const RecipesContext = createContext({
  recipes: [],
});
export default RecipesContext;

export function RecipesInfosContext({ children }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/recipes`)
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const context = useMemo(
    () => ({
      recipes,
      setRecipes,
    }),
    [recipes, setRecipes]
  );

  return (
    <RecipesContext.Provider value={context}>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesInfosContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
