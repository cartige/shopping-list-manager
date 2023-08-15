import { useContext, useEffect, useState } from "react";
import "./listValidation.scss";
import PropTypes from "prop-types";
import ListValidationDetails from "./ListValidationDetails/ListValidationDetails";
import ListValidationAdd from "./ListValidationAdd/ListValidationAdd";
import ListsContext from "../../contexts/ListsContext";
import IngredientsContext from "../../contexts/IngredientsContext";

export default function ListValidation({ isDisplay }) {
  const { listForm, setListForm } = useContext(ListsContext);
  const {
    ingredients: allIngredients,
    allIngredientsByType,
    mapIngredientsByType,
    groupIngredientByUnitAndQuantity,
  } = useContext(IngredientsContext);
  const [editingIngredients, setEditingIngredients] = useState(
    listForm.ingredients
  );
  const [ingredientsFiltered, setIngredientsFiltered] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [typeId, setTypeId] = useState(undefined);
  // const [allIngredients, setAllIngredients] = useState([]);
  const [pagesNumber, setPagesNumber] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [nbOfElementByPage, setNbOfElementByPage] = useState(5);

  useEffect(() => {
    if (isDisplay) {
      const ingredientsGrouped = groupIngredientByUnitAndQuantity(
        listForm.ingredients
      );
      const ingredientByTypes = mapIngredientsByType(ingredientsGrouped);

      setListForm({
        ...listForm,
        ingredientByTypes,
        ingredients: ingredientsGrouped,
      });
      setIngredientsFiltered(allIngredients.sort((a, b) => a.id - b.id));
    }
  }, [isDisplay]);

  useEffect(() => {
    if (isDisplay) {
      setIngredientsFiltered(allIngredients.sort((a, b) => a.id - b.id));
    }
  }, [isDisplay, allIngredients]);

  useEffect(() => {
    if (isDisplay) {
      const ingredientByTypes = mapIngredientsByType(editingIngredients);
      setListForm({ ...listForm, ingredientByTypes });
      setListForm({ ...listForm, ingredients: editingIngredients });
    }
  }, [editingIngredients]);

  useEffect(() => {
    if (isDisplay) {
      const numberOfPages = [];
      let pageIndex = 0;
      for (let i = 1; i <= ingredientsFiltered.length; i += 1) {
        debugger;
        if (
          i > 1 &&
          (ingredientsFiltered.length - i) % nbOfElementByPage === 0
        ) {
          debugger;
          numberOfPages.push(pageIndex);
          pageIndex += nbOfElementByPage;
        }
      }
      setPagesNumber(numberOfPages);
      setCurrentPage(0);
    }
  }, [ingredientsFiltered, isDisplay, nbOfElementByPage]);

  const handleFilter = (evt) => {
    console.log(evt.target.name);
    const { value, name } = evt.target;
    // let ingredients = [];
    if (name === "type-filter") {
      // ({ ingredients } = allIngredientsByType.find(
      //   (type) => type.id === parseInt(value, 10)
      // ));
      setTypeId(parseInt(value, 10));
    } else {
      setFilterValue(value);
    }

    // console.log(ingredients);
    // setIngredientsFiltered(ingredients);
  };

  useEffect(() => {
    setIngredientsFiltered(
      allIngredients
        .filter((ingredient) => {
          if (typeId) {
            return (
              ingredient.name.includes(filterValue) &&
              typeId === ingredient.IngredientType.id
            );
          }
          return ingredient.name.includes(filterValue);
        })
        .sort((a, b) => a.id - b.id)
    );
    setCurrentPage(0);
  }, [filterValue, typeId]);

  const handlePagination = (evt) => {
    console.log(evt.target.value);
    setCurrentPage(parseInt(evt.target.value, 10));
  };

  const hNbrPerPage = (evt) => {
    const { value } = evt.target;
    if (value === "page-number-select") {
      setNbOfElementByPage(5);
    } else {
      setNbOfElementByPage(parseInt(value, 10));
    }
  };

  // console.log(currentPage);
  // console.log(ingredientsFiltered.slice(5, 10));

  console.log(ingredientsFiltered);
  return (
    <div className="list-validation-container">
      <h1 className="list-validation-title">Récapitulatif</h1>

      <h2 className="final-list-name">{listForm.name}</h2>

      <div>
        <ul className="list-validation-details">
          {listForm.ingredientByTypes.map((type) => {
            const { id } = type;
            return (
              <div key={id} className="list-validation-detail-container">
                <ListValidationDetails
                  ingredientByType={type}
                  ingredients={editingIngredients}
                  setIngredients={setEditingIngredients}
                />
              </div>
            );
          })}
        </ul>
      </div>

      <div className="add-list-element-container">
        <h1 className="add-list-element-title">
          Rajouter des élements à la liste ?
        </h1>
        {allIngredientsByType && (
          <div className="add-list-elements">
            <div className="ingredient-list-filter">
              <select
                name="type-filter"
                id="type-filter"
                onChange={handleFilter}
                className="add-list-select"
              >
                <option value="0">Tous les elements</option>
                {allIngredientsByType.map((ingredientType) => {
                  const { name, id, ingredients } = ingredientType;
                  return (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <input type="text" onChange={handleFilter} value={filterValue} />
              <select
                name="number-of-page"
                id="number-of-page"
                onChange={hNbrPerPage}
              >
                <option value="page-number-select">Nbr par page</option>
                {["5", "10", "15", "20"].map((nbr) => {
                  return (
                    <option value={nbr} id={nbr}>
                      {nbr}
                    </option>
                  );
                })}
              </select>
            </div>

            <ul className="add-element-list">
              {/* {currentPage}
              {currentPage + 1} */}
              {ingredientsFiltered
                .slice(currentPage, currentPage + nbOfElementByPage)
                .map((ingredient) => {
                  const { id } = ingredient;
                  return (
                    <ListValidationAdd
                      key={id}
                      item={ingredient}
                      isDisplay={isDisplay}
                    />
                  );
                })}
            </ul>

            <div className="pagination">
              {pagesNumber.map((pageNumber, index) => {
                return (
                  <button
                    type="button"
                    className="pagination-button"
                    onClick={handlePagination}
                    value={pageNumber}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ListValidation.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
};
