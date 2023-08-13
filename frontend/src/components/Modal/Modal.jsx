import "./modal.scss";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { RiCloseFill } from "react-icons/ri";

function Modal({
  isShowing,
  hide,
  title,
  headerBackground,
  titleColor,
  ...props
}) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="modalOverlay">
          <div className="modalWrapper">
            <div className="modal">
              <div
                className="modalHeader"
                style={{ backgroundColor: headerBackground }}
              >
                <h4
                  className="modalTitle"
                  style={{
                    backgroundColor: headerBackground,
                    color: titleColor,
                  }}
                >
                  {title}
                </h4>

                <RiCloseFill
                  onClick={hide}
                  className="modalCloseButton"
                  style={{ backgroundColor: headerBackground }}
                />
              </div>

              <div className="modalBody">{props.children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  headerBackground: PropTypes.string,
  titleColor: PropTypes.string,
};

Modal.defaultProps = {
  title: "",
  headerBackground: "black",
  titleColor: "white",
};

export default Modal;
