import { useNavigate } from "react-router-dom";
import useModal from "../useModal/useModal";
import SignInForm from "../Form/SignIn/SignIn";
import Modal from "../Modal/Modal";
import "./navBarHome.scss";

export default function NavBarHome() {
  const navigate = useNavigate();
  const { isShowing: showLog, toggle: toggleLog } = useModal();

  const hLog = () => {
    navigate("/myrecipes");
  };
  return (
    <nav className="nav-bar-home-container">
      <ul className="nav-bar-home">
        <li className="nav-home-link" role="presentation" onClick={toggleLog}>
          Se Connecter
        </li>
        <li className="nav-home-link" role="presentation" onClick={hLog}>
          S'enregistrer
        </li>
      </ul>
      <Modal isShowing={showLog} hide={toggleLog} title="Connexion">
        <div>
          <SignInForm />
        </div>
      </Modal>
    </nav>
  );
}

// NavBar.propTypes = {
//   links: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//       path: PropTypes.string,
//     })
//   ).isRequired,
// };
