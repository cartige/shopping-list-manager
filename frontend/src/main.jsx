import React from "react";
import ReactDOM from "react-dom/client";
import { UserInfosContext } from "./contexts/UserContext";
import { RecipesInfosContext } from "./contexts/RecipesContext";
import { ListsInfosContext } from "./contexts/ListsContext";
import { IngredientsInfosContext } from "./contexts/IngredientsContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserInfosContext>
      <RecipesInfosContext>
        <ListsInfosContext>
          <IngredientsInfosContext>
            <App />
          </IngredientsInfosContext>
        </ListsInfosContext>
      </RecipesInfosContext>
    </UserInfosContext>
  </React.StrictMode>
);

// permettre a l'utilisateur de faire des listes 'custom' et de barrer les ingrédients deja pris
// ajouter une recette en privé ou public et pouvoir ajouter des recettes dans MyRecipes depuis la liste de recette public
