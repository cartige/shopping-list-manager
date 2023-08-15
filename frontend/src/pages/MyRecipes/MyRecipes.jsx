import "./myRecipes.scss";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/bundle";
import { useContext, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import Button from "../../components/Button/Button";
import PanelSwitcher from "../../components/Layouts/PanelSwitcher/PanelSwitcher";
import NavBarLog from "../../components/NavBarLog/NavBarLog";
import Recipe from "../../components/Recipe/Recipe";
import Modal from "../../components/Modal/Modal";
import UserContext from "../../contexts/UserContext";
import RecipesContext from "../../contexts/RecipesContext";
import RecipeForm from "../../components/Form/RecipeForm/RecipeForm";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import useModal from "../../components/useModal/useModal";

export default function MyRecipes() {
  const defaultRecipe = {
    id: undefined,
    name: "",
    img: null,
    isPublic: false,
    ingredients: [],
    UserId: undefined,
  };
  const { setCurrentUser, myRecipes } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);
  const { isShowing: showForm, toggle: toggleForm } = useModal();
  const [selectedRecipe, setSelectedRecipe] = useState(defaultRecipe);
  const [selectedMyRecipe, setSelectedMyRecipe] = useState(defaultRecipe);
  const navigate = useNavigate();
  // register();

  const hLogOut = () => {
    setCurrentUser({});
    swal({
      title: "A Bientot !",
      buttons: false,
      timer: 1000,
    });
    setTimeout(() => navigate("/"), 1000);
  };
  console.log(selectedRecipe);

  // const handleRecipeSelect = (stateName, recipe = defaultRecipe) => {
  //   if (stateName === "recipes") {
  //     setSelectedRecipe(recipe);
  //   } else {
  //     setSelectedMyRecipe(recipe);
  //   }
  // };

  return (
    <div className="my-recipes">
      <NavBarLog />

      <div className="body-myrecipes">
        <Button type="button" className="main-button" onClick={toggleForm}>
          Ajouter un plat
        </Button>

        <h2
          className={`${
            !(selectedRecipe.id || selectedMyRecipe.id)
              ? "display-title"
              : "hide-title"
          }`}
        >
          Mes Recettes
        </h2>
        {myRecipes && (
          <PanelSwitcher
            open={!!selectedMyRecipe.id}
            isDisabled={!!selectedRecipe.id}
          >
            <div className="recipes-list my-recipes">
              <Swiper
                modules={[Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay
                pagination
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  525: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  750: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  950: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {myRecipes.map((recipe) => {
                  return (
                    <SwiperSlide key={recipe.id}>
                      <Recipe
                        key={recipe.id}
                        onClick={() => setSelectedMyRecipe(recipe)}
                        recipe={recipe}
                        display
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {selectedMyRecipe && (
              <RecipeDetails
                onClick={() => setSelectedMyRecipe(defaultRecipe)}
                recipe={selectedMyRecipe}
              />
            )}
          </PanelSwitcher>
        )}
        <h2
          className={`${
            !(selectedRecipe.id || selectedMyRecipe.id)
              ? "display-title"
              : "hide-title"
          } display-title-all-recipes`}
        >
          Toutes les recettes
        </h2>
        {recipes && (
          <PanelSwitcher
            open={!!selectedRecipe.id}
            isDisabled={!!selectedMyRecipe.id}
          >
            <div className="recipes-list all-recipes">
              <Swiper
                modules={[Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                autoplay
                pagination
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  525: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  750: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  950: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {recipes.map((recipe) => {
                  return recipe.isPublic ? (
                    <SwiperSlide key={recipe.id}>
                      <Recipe
                        key={recipe.id}
                        onClick={() => setSelectedRecipe(recipe)}
                        recipe={recipe}
                        display
                      />
                    </SwiperSlide>
                  ) : null;
                })}
              </Swiper>
            </div>

            {selectedRecipe && (
              <RecipeDetails
                onClick={() => setSelectedRecipe(defaultRecipe)}
                recipe={selectedRecipe}
              />
            )}
          </PanelSwitcher>
        )}
      </div>

      <AiOutlinePoweroff className="log-out-mobile" onClick={hLogOut} />

      <Modal
        isShowing={showForm}
        hide={toggleForm}
        title="Ajouter un plat"
        headerBackground="white"
        titleColor="black"
      >
        <RecipeForm />
      </Modal>
    </div>
  );
}
