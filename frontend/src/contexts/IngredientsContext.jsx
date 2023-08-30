import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import UserContext from "./UserContext";
import ListsContext from "./ListsContext";

const IngredientsContext = createContext({
  ingredients: [],
});
export default IngredientsContext;

export function IngredientsInfosContext({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [allIngredientsByType, setAllIngredientsByType] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { listForm } = useContext(ListsContext);

  const mapIngredientsByType = (ingredientsToMap) => {
    const ingredientByTypes = [];
    let currentType = { id: undefined, name: "", ingredients: [] };
    ingredientsToMap.sort((a, b) => a.type.id - b.type.id);
    debugger;
    ingredientsToMap.forEach((ingredient, index) => {
      const {
        type: { id },
      } = ingredient;
      if (
        ingredientsToMap[index + 1] &&
        ingredientsToMap[index + 1].type.id === id
      ) {
        currentType.name = ingredient.type.name;
        currentType.id = ingredient.type.id;
        currentType.ingredients.push(ingredient);
      } else {
        currentType.name = ingredient.type.name;
        currentType.id = ingredient.type.id;
        currentType.ingredients.push(ingredient);
        ingredientByTypes.push(currentType);
        currentType = { id: undefined, name: "", ingredients: [] };
      }
    });
    return ingredientByTypes;
  };

  // const groupIngredientByUnitAndQuantity = (ingredientsToGroup) => {
  //   let currentIngredient = { quantity: 0, unit: null, id: undefined };
  //   const ingredientsGrouped = [];
  //   ingredientsToGroup.sort((a, b) => a.id - b.id);
  //   ingredientsToGroup.forEach((ingredient, index) => {
  //     if (
  //       ingredientsToGroup[index + 1] &&
  //       ingredientsToGroup[index + 1].id === ingredient.id
  //     ) {
  //       if (ingredientsToGroup[index + 1].unit === ingredient.unit) {
  //         const { quantity } = currentIngredient;
  //         const { quantity: newQuantity, unit } = ingredient;
  //         currentIngredient = {
  //           ...ingredient,
  //           quantity: quantity + newQuantity,
  //           unit,
  //           IngredientId: ingredient.id,
  //         };
  //       } else if (currentIngredient.quantity) {
  //         ingredientsGrouped.push({
  //           ...currentIngredient,
  //           quantity: currentIngredient.quantity + ingredient.quantity,
  //         });
  //         currentIngredient = { quantity: 0, unit: "", id: undefined };
  //       }
  //     } else if (currentIngredient.id === ingredient.id) {
  //       ingredientsGrouped.push({
  //         ...currentIngredient,
  //         quantity: currentIngredient.quantity + ingredient.quantity,
  //       });
  //       currentIngredient = { quantity: 0, unit: "", id: undefined };
  //     } else if (currentIngredient.quantity) {
  //       ingredientsGrouped.push({
  //         ...currentIngredient,
  //         quantity: currentIngredient.quantity + ingredient.quantity,
  //       });
  //       ingredientsGrouped.push({
  //         ...ingredient,
  //         IngredientId: ingredient.id,
  //       });
  //       currentIngredient = { quantity: 0, unit: "", id: undefined };
  //     } else {
  //       ingredientsGrouped.push({
  //         ...ingredient,
  //         IngredientId: ingredient.id,
  //       });
  //     }
  //   });
  //   return ingredientsGrouped;
  // };

  const groupIngredientByUnitAndQuantity = (ingredientsToGroup) => {
    ingredientsToGroup
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => a.unit - b.unit);

    return ingredientsToGroup.reduce((acc, current) => {
      if (
        acc.length &&
        acc[acc.length - 1].id === current.id &&
        acc[acc.length - 1].unit === current.unit
      ) {
        let prevElem = acc.pop();
        prevElem = {
          ...prevElem,
          quantity: prevElem.quantity + current.quantity,
        };
        acc.push(prevElem);
      } else {
        acc.push({ ...current, key: acc.length + 1 });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ingredients`)
      .then(({ data }) => {
        setAllIngredientsByType(data);
        setIngredients(
          data.reduce((acc, curr) => {
            return acc.concat(curr.ingredients);
          }, [])
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  useEffect(() => {
    const { ingredients: listFormIngredients } = listForm;
    setIngredients(
      ingredients.filter((ingredient) => {
        return (
          listFormIngredients.find(
            (formIngredient) => ingredient.id === formIngredient.id
          ) === undefined
        );
      })
    );
  }, [listForm]);
  console.log(ingredients);
  const context = useMemo(
    () => ({
      ingredients,
      allIngredientsByType,
      setIngredients,
      mapIngredientsByType,
      groupIngredientByUnitAndQuantity,
    }),
    [
      ingredients,
      allIngredientsByType,
      setIngredients,
      mapIngredientsByType,
      groupIngredientByUnitAndQuantity,
    ]
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
