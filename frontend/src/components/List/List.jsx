import "./list.scss";
import { BsArrowRightCircle } from "react-icons/bs";
import { PropTypes } from "prop-types";

export default function List({ list, onClick }) {
  return (
    <div onClick={onClick} className="list-card" role="presentation">
      <div className="list-card-text">
        <h2 className="list-name">{list.name}</h2>
        <p className="list-date">{list.date}</p>
        <BsArrowRightCircle className="arrow-list" />
      </div>
    </div>
  );
}

List.propTypes = {
  onClick: PropTypes.func.isRequired,
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
  }),
};

List.defaultProps = {
  list: {},
};
