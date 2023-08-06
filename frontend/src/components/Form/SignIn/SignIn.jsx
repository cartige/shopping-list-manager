import { useContext, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import "./signin.scss";
import UserContext from "../../../contexts/UserContext";

export default function SignInForm() {
  const { setCurrentUser } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const hChange = (evt) => {
    setLoginForm({ ...loginForm, [evt.target.name]: evt.target.value });
  };
  const hLogin = (evt) => {
    evt.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, loginForm)
      .then(({ data }) => {
        setCurrentUser(data);
        navigate("/myrecipes");
        swal({
          title: "Bienvenue !",
          icon: "success",
          buttons: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form action="log" className="log-form appear-stage" onSubmit={hLogin}>
      <label htmlFor="email" name="email">
        Email
      </label>
      <input
        type="email"
        placeholder="email"
        name="email"
        onChange={hChange}
        value={loginForm.email}
        className="input-log-form"
      />
      <label htmlFor="password">Mot de Passe</label>
      <input
        type="password"
        placeholder="mot de passe"
        name="password"
        onChange={hChange}
        value={loginForm.password}
        className="input-log-form"
      />
      <Button type="submit" name="log-in" id="log-in" onClick={hLogin}>
        Connexion
      </Button>
    </form>
  );
}
