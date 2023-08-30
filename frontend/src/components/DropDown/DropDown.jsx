import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiCheck } from "react-icons/fi";
import DropDownItem from "./DropDownItem/DropDownItem";
import "./dropDown.scss";
import Button from "../Button/Button";

export default function DropDown({
  listName,
  list,
  setIngredientsForm,
  ingredientsForm,
  setIngredients,
}) {
  const [isExtended, setIsExtended] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const [filteredList, setFilteredList] = useState(list);
  const [pagesNumber, setPagesNumber] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const nbOfElementByPage = 5;

  useEffect(() => {
    if (isExtended) {
      const numberOfPages = [];
      let pageIndex = 0;
      for (let i = 0; i <= filteredList.length; i += 1) {
        if (i > 0 && (filteredList.length - i) % nbOfElementByPage === 0) {
          numberOfPages.push(pageIndex);
          pageIndex += 1;
        }
      }
      setPagesNumber(numberOfPages);
      if (filteredList.length < nbOfElementByPage) {
        setCurrentPage(0);
      }
    }
  }, [filteredList, isExtended]);

  useEffect(() => {
    setFilteredList(list.filter((item) => item.name.includes(filter)));
  }, [filter, list]);

  useEffect(() => {
    setIngredients(
      list.map((i) => {
        if (i.id === ingredient.id) {
          return { ...ingredient };
        }
        return { ...i };
      })
    );
  }, [ingredient]);

  const handlePagination = (evt) => {
    console.log(typeof evt.target.value);
    setCurrentPage((parseInt(evt.target.value, 10) - 1) * nbOfElementByPage);
  };

  const clickable = isExtended ? null : () => setIsExtended(!isExtended);

  console.log(currentPage, "current page");
  return (
    <div
      className="drop-down-container"
      onClick={clickable}
      role="presentation"
    >
      <div
        className="drop-down"
        onClick={() => setIsExtended(!isExtended)}
        role="presentation"
      >
        <button
          type="button"
          className="list-name"
          onClick={() => setIsExtended(!isExtended)}
        >
          {listName}
        </button>
        {isExtended ? (
          <SlArrowUp
            onClick={() => setIsExtended(!isExtended)}
            className="list-name"
          />
        ) : (
          <SlArrowDown
            onClick={() => setIsExtended(!isExtended)}
            className="list-name"
          />
        )}
      </div>

      <div className={`list-items ${isExtended ? "drop-down-display" : ""}`}>
        {filteredList
          .slice(currentPage, currentPage + nbOfElementByPage)
          .map((item) => {
            return (
              <DropDownItem
                item={item}
                key={item.id}
                setIngredientsForm={setIngredientsForm}
                ingredientsForm={ingredientsForm}
                setIngredient={setIngredient}
              />
            );
          })}
      </div>
      <div className="footer-drop-down">
        {pagesNumber.length > 1 && isExtended ? (
          <div className="pagination">
            {pagesNumber.map((pageNumber, index) => {
              const isActive =
                currentPage === 0
                  ? pageNumber === currentPage
                  : pageNumber ===
                    currentPage - (nbOfElementByPage * pageNumber - pageNumber);
              return (
                <Button
                  type="button"
                  className={`pagination-button ${
                    isActive
                      ? "btn-pagination-selected"
                      : "btn-pagination-not-selected"
                  }`}
                  key={pageNumber}
                  onClick={handlePagination}
                  value={(pageNumber + 1).toString()}
                >
                  {pageNumber + 1}
                </Button>
              );
            })}
          </div>
        ) : null}
        {isExtended ? (
          <input
            type="text"
            className="drop-down-filter"
            placeholder="Ingrédient..."
            value={filter}
            onChange={(evt) => setFilter(evt.target.value)}
          />
        ) : null}
      </div>
    </div>
  );
}

DropDown.propTypes = {
  listName: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  setIngredientsForm: PropTypes.func.isRequired,
  ingredientsForm: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setIngredients: PropTypes.func.isRequired,
};
