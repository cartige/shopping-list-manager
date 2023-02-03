import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";
import Recipe from "../../Recipe/Recipe";
import "./listForm.scss";

export default function ListForm() {
  const { currentUser } = useContext(UserContext);
  const [listForm, setListForm] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/recipes?userId=${currentUser.id}`
      )
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  const hChange = (evt) => {
    if (evt.target.name === "name") {
      setListForm({
        ...listForm,
        [evt.target.name]: evt.target.value,
      });
    }
  };
  return (
    <form className="list-form">
      <div className="input-list-container">
        <label htmlFor="name" className="input-name-list">
          Nom de la liste
        </label>
        <input
          placeholder="nom"
          name="name"
          value={listForm.name}
          onChange={hChange}
          className="input-list-form"
        />
      </div>

      <ul className="recipe-list">
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} display={false} />;
        })}
      </ul>
    </form>
  );
}
