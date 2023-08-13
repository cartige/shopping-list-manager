import { useNavigate } from "react-router-dom";
import "./navBarLog.scss";
import { useContext } from "react";
import swal from "sweetalert";
import NavLink from "../NavLink/NavLink";
import Button from "../Button/Button";
import UserContext from "../../contexts/UserContext";

export default function NavBarLog() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const hLogOut = () => {
    setCurrentUser({});
    swal({
      title: "A Bientot !",
      buttons: false,
      timer: 1000,
    });
    setTimeout(() => navigate("/"), 1000);
  };
  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <NavLink
          to="/myrecipes"
          className={({ isActive }) =>
            isActive ? "active-link nav-links" : "inactive-link nav-links"
          }
        >
          Mes Plats
        </NavLink>

        <NavLink
          to="/mylists"
          className={({ isActive }) =>
            isActive ? "active-link nav-links" : "inactive-link nav-links"
          }
        >
          Mes Listes
        </NavLink>

        <Button type="button" onClick={hLogOut} className="log-out">
          Se Deconnecter
        </Button>
      </ul>
    </nav>
  );
}
