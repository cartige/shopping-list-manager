import { createContext, useState, useMemo, useEffect, useContext } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import UserContext from "./UserContext";

const ListsContext = createContext({
  myLists: [],
});
export default ListsContext;

export function ListsInfosContext({ children }) {
  const [myLists, setMyLists] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [listForm, setListForm] = useState({
    UserId: undefined,
    name: "",
    ingredients: [],
  });

  const mapIngredientsByType = (ingredientsToMap) => {
    const ingredientByTypes = [];
    let currentType = { id: undefined, name: "", ingredients: [] };
    ingredientsToMap.sort((a, b) => a.type.id - b.type.id);
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
        // currentType = { ...currentType, ingredients };
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

  const groupIngredientByUnitAndQuantity = (ingredientsToGroup) => {
    let currentIngredient = { quantity: 0, unit: null, id: undefined };
    const ingredientsGrouped = [];
    ingredientsToGroup.sort((a, b) => a.id - b.id);
    ingredientsToGroup.forEach((ingredient, index) => {
      if (
        ingredientsToGroup[index + 1] &&
        ingredientsToGroup[index + 1].id === ingredient.id
      ) {
        if (ingredientsToGroup[index + 1].unit === ingredient.unit) {
          const { quantity } = currentIngredient;
          const { quantity: newQuantity, unit } = ingredient;
          currentIngredient = {
            ...ingredient,
            quantity: quantity + newQuantity,
            unit,
            IngredientId: ingredient.id,
          };
        } else if (currentIngredient.quantity) {
          ingredientsGrouped.push({
            ...currentIngredient,
            quantity: currentIngredient.quantity + ingredient.quantity,
          });
          currentIngredient = { quantity: 0, unit: "", id: undefined };
        }
      } else if (currentIngredient.id === ingredient.id) {
        ingredientsGrouped.push({
          ...currentIngredient,
          quantity: currentIngredient.quantity + ingredient.quantity,
        });
        currentIngredient = { quantity: 0, unit: "", id: undefined };
      } else if (currentIngredient.quantity) {
        ingredientsGrouped.push({
          ...currentIngredient,
          quantity: currentIngredient.quantity + ingredient.quantity,
        });
        ingredientsGrouped.push({
          ...ingredient,
          IngredientId: ingredient.id,
        });
        currentIngredient = { quantity: 0, unit: "", id: undefined };
      } else {
        ingredientsGrouped.push({
          ...ingredient,
          IngredientId: ingredient.id,
        });
      }
    });
    return ingredientsGrouped;
  };

  useEffect(() => {
    if (currentUser.user && currentUser.user.id) {
      const {
        user: { id },
      } = currentUser;
      setListForm({ ...listForm, UserId: id });
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/lists/${id}`)
        .then(({ data }) => {
          setMyLists(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser, listForm.id]);

  useEffect(() => {
    setListForm({
      ...listForm,
      ingredientByTypes: mapIngredientsByType(
        groupIngredientByUnitAndQuantity(listForm.ingredients)
      ),
    });
  }, [listForm.ingredients]);

  console.log(listForm);
  const context = useMemo(
    () => ({
      myLists,
      listForm,
      setMyLists,
      setListForm,
    }),
    [myLists, listForm, setListForm, setMyLists]
  );
  console.log(myLists, "my lists");

  return (
    <ListsContext.Provider value={context}>{children}</ListsContext.Provider>
  );
}

ListsInfosContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
