import "./myLists.scss";
import { useContext, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NavBarLog from "../../components/NavBarLog/NavBarLog";
import PanelSwitcher from "../../components/Layouts/PanelSwitcher/PanelSwitcher";
import useModal from "../../components/useModal/useModal";
import Modal from "../../components/Modal/Modal";
import UserContext from "../../contexts/UserContext";
import ListsContext from "../../contexts/ListsContext";
import List from "../../components/List/List";
import ListForm from "../../components/Form/ListForm/ListForm";
import ListDetails from "../../components/ListDetails/ListDetails";

export default function MyLists() {
  const { myLists } = useContext(ListsContext);
  const { setCurrentUser } = useContext(UserContext);
  const { isShowing: showForm, toggle: toggleForm } = useModal();

  const [selectedList, setSelectedList] = useState();
  const navigate = useNavigate();

  const mapIngredients = (myList) => {
    const { ingredients } = myList;

    return ingredients.map((ingredient) => ingredient);
  };
  console.log(myLists, "my lists");
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

        <PanelSwitcher open={!!selectedList} isDisabled={false}>
          <div className="shopping-list-container">
            <h1 className="title-my-lists">Mes listes</h1>
            <div className="shopping-list">
              {myLists.map((list) => {
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
          </div>

          {selectedList && (
            <ListDetails
              ingredientByTypes={selectedList.ingredients}
              setSelectedList={setSelectedList}
            />
          )}
        </PanelSwitcher>
      </div>

      <AiOutlinePoweroff className="log-out-mobile" onClick={hLogOut} />

      <Modal isShowing={showForm} hide={toggleForm} title="Créer une liste">
        <ListForm toggleForm={toggleForm} />
      </Modal>
    </div>
  );
}
