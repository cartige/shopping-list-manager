import { NavLink as Link } from "react-router-dom";
import "./navLink.scss";
import PropTypes from "prop-types";

export default function NavLink({ children, to }) {
  return (
    <Link
      to={to}
      className={({ isActive }) =>
        isActive ? "active nav-link" : "inactive nav-link"
      }
    >
      <li className="nav-title">{children}</li>
    </Link>
  );
}

NavLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  to: PropTypes.string.isRequired,
};
