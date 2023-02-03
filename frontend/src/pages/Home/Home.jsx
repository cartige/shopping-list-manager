import { useNavigate } from "react-router-dom";
import NavBarHome from "../../components/NavBarHome/NavBarHome";
import "./home.scss";
import SignInForm from "../../components/Form/SignIn/SignIn";

export default function Home() {
  const navigate = useNavigate;
  const hRegister = (evt) => {
    evt.preventDefault();
    navigate("/myrecipes");
  };
  return (
    <div className="home">
      <NavBarHome />
      <div className="height-center">
        <div className="desk-home">
          <div className="description">
            <h1 className="title-desk">Shopping List Manager</h1>
            <p className="home-description">
              Shopping list manager est une application qui vous permet de faire
              votre liste de course en fonction des recettes que vous aurez
              décidé de cuisiner cette semaine
            </p>
          </div>
          <div className="img-home-container">
            <img
              className="img-home"
              src="https://www.stickersmalin.com/images/ajoute/prd/76/76166-image2_448x448.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="mobile-home staggered-appear">
        <h1 className="home-title appear-stage">Shopping List Manager</h1>
        <p className="home-description appear-stage">
          Shopping list manager est une application qui vous permet de faire
          votre liste de course en fonction des recettes que vous aurez décidé
          de cuisiner cette semaine
        </p>
        <SignInForm />
        <h2>
          No account yet ? register{" "}
          <button className="button-register" onClick={hRegister} type="button">
            here
          </button>
        </h2>
      </div>
    </div>
  );
}
