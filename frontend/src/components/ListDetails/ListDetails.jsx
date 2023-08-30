import "./listDetails.scss";
import PropTypes from "prop-types";
import { BsArrowLeftCircle } from "react-icons/bs";
import ListDetailsType from "./ListDetailsType/ListDetailsType";

export default function ListDetails({ ingredientByTypes, setSelectedList }) {
  console.log(ingredientByTypes);
  return (
    <div className="list-details">
      <BsArrowLeftCircle
        className="arrow-list-close"
        onClick={() => setSelectedList(null)}
      />

      <ul className="list-ingredients">
        {ingredientByTypes.map((type) => {
          return (
            <div key={type.id}>
              <ListDetailsType type={type} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

ListDetails.propTypes = {
  ingredientByTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          quantity: PropTypes.number,
          unit: PropTypes.string,
          type: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        })
      ),
    })
  ).isRequired,
  setSelectedList: PropTypes.func.isRequired,
};
