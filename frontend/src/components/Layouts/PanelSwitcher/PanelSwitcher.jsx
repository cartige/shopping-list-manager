import "./panelSwitcher.scss";
import PropTypes from "prop-types";

export default function PanelSwitcher({ open, children, isDisabled }) {
  return isDisabled ? null : (
    <div className="panel-switcher">
      <div className={open ? "panels open" : "panels"}>
        <section className="panel">{children[0]}</section>
        <section className="panel">{children[1]}</section>
      </div>
    </div>
  );
}

PanelSwitcher.propTypes = {
  open: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
