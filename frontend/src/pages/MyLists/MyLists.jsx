import "./myLists.scss";
import { useContext, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsArrowLeftCircle } from "react-icons/bs";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NavBarLog from "../../components/NavBarLog/NavBarLog";
import PanelSwitcher from "../../components/Layouts/PanelSwitcher/PanelSwitcher";
import List from "../../components/List/List";
import useModal from "../../components/useModal/useModal";
import Modal from "../../components/Modal/Modal";
import UserContext from "../../contexts/UserContext";
import ListForm from "../../components/Form/ListForm/ListForm";

export default function MyLists() {
  const { setCurrentUser } = useContext(UserContext);
  const { isShowing: showForm, toggle: toggleForm } = useModal();

  const [selectedList, setSelectedList] = useState();
  const navigate = useNavigate();

  const mapIngredients = (myList) => {
    const myIngredients = [];
    const { ingredients } = myList;
    ingredients.forEach((ingredient) => {
      myIngredients.push(ingredient);
    });
    return myIngredients;
  };

  const exLists = [
    {
      id: 1,
      name: "Ma liste de test",
      dateCreation: "Jeudi 2 Février",
      ingredients: [
        { id: 1, name: "carotte", type: "Fruit et Légumes" },
        { id: 2, name: "poulet", type: "Volaille" },
      ],
    },
    {
      id: 2,
      name: "Ma liste de test 2",
      dateCreation: "Jeudi 2 Février",
      ingredients: [
        { id: 1, name: "concombre", type: "Fruit et Légumes" },
        { id: 2, name: "boeuf haché", type: "Boucherie" },
      ],
    },
  ];

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
    <div className="my-lists">
      <NavBarLog />
      <div className="body-mylists">
        <Button type="button" className="main-button" onClick={toggleForm}>
          Créer une liste
        </Button>
        <PanelSwitcher open={!!selectedList}>
          <div className="shopping-list">
            {exLists.map((list) => {
              const ingredients = mapIngredients(list);
              return (
                <List
                  key={list.id}
                  onClick={() => setSelectedList(list)}
                  list={list}
                  ingredients={ingredients}
                />
              );
            })}
          </div>
          <div className="list-details">
            <BsArrowLeftCircle
              className="arrow-list-close"
              onClick={() => setSelectedList(null)}
            />
            {selectedList && (
              <ul className="list-ingredients">
                {mapIngredients(selectedList).map((ingredient) => {
                  return (
                    <li key={ingredient.id} className="ingredient-name">
                      {ingredient.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </PanelSwitcher>
      </div>
      <AiOutlinePoweroff className="log-out-mobile" onClick={hLogOut} />
      <Modal isShowing={showForm} hide={toggleForm} title="Créer une liste">
        <ListForm />
      </Modal>
    </div>
  );
}
