import { useContext, useEffect, useState } from "react";
import "./listValidation.scss";
import PropTypes from "prop-types";
import ListValidationDetails from "./ListValidationDetails/ListValidationDetails";
import ListValidationAdd from "./ListValidationAdd/ListValidationAdd";
import ListsContext from "../../contexts/ListsContext";
import IngredientsContext from "../../contexts/IngredientsContext";
import Button from "../Button/Button";

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
      for (let i = 0; i <= ingredientsFiltered.length; i += 1) {
        if (
          i > 0 &&
          (ingredientsFiltered.length - i) % nbOfElementByPage === 0
        ) {
          numberOfPages.push(pageIndex);
          pageIndex += 1;
        }
      }
      setPagesNumber(numberOfPages);
      if (ingredientsFiltered.length < nbOfElementByPage) {
        setCurrentPage(0);
      }
    }
  }, [ingredientsFiltered, isDisplay, nbOfElementByPage]);

  const handleFilter = (evt) => {
    const { value, name } = evt.target;
    if (name === "type-filter") {
      setTypeId(parseInt(value, 10));
    } else {
      setFilterValue(value);
    }
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
    setCurrentPage((parseInt(evt.target.value, 10) - 1) * nbOfElementByPage);
  };

  const hNbrPerPage = (evt) => {
    const { value } = evt.target;
    if (value === "page-number-select") {
      setNbOfElementByPage(5);
    } else {
      setNbOfElementByPage(parseInt(value, 10));
    }
  };

  return (
    <div className="list-validation-container">
      <h1 className="list-validation-title">Récapitulatif</h1>

      <h2 className="final-list-name">{listForm.name}</h2>

      <div>
        <ul className="list-validation-details">
          {mapIngredientsByType(listForm.ingredients).map((type) => {
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
                  const { name, id } = ingredientType;
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
                    <option value={nbr} id={nbr} key={nbr}>
                      {nbr}
                    </option>
                  );
                })}
              </select>
            </div>

            <ul className="add-element-list">
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
                const isActive =
                  currentPage === 0
                    ? pageNumber === currentPage
                    : pageNumber ===
                      currentPage -
                        (nbOfElementByPage * pageNumber - pageNumber);
                return (
                  <Button
                    key={pageNumber}
                    type="button"
                    className={`pagination-button ${
                      isActive
                        ? "btn-pagination-selected"
                        : "btn-pagination-not-selected"
                    }`}
                    onClick={handlePagination}
                    value={(pageNumber + 1).toString()}
                  >
                    {pageNumber + 1}
                  </Button>
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
