import "./button.scss";
import { PropTypes } from "prop-types";

export default function Button({
  type,
  children,
  onClick,
  name,
  id,
  className,
  disabled,
  value,
}) {
  return (
    <button
      name={name}
      id={id}
      onClick={onClick}
      className={`button ${className}`}
      type={type === "button" ? "button" : "submit"}
      disabled={disabled}
      value={value}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  type: PropTypes.oneOf(["submit", "button"]),
  name: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  onClick: null,
  name: null,
  id: null,
  type: "button",
  className: "",
  disabled: false,
  value: "",
};
