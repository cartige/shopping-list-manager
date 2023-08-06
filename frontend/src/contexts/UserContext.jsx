import { createContext, useState, useMemo, useEffect } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
// import swal from "sweetalert";

const UserContext = createContext({
  currentUser: {},
});

export default UserContext;

export function UserInfosContext({ children }) {
  const [currentUser, setCurrentUser] = useState({
    token: "",
    user: {
      id: undefined,
      email: "",
      firstname: "",
      lastname: "",
      createdAt: "",
      updatedAt: "",
    },
  });
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser.user && currentUser.user.id) {
      const {
        user: { id },
      } = currentUser;
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/recipes?userId=${id}`)
        .then(({ data }) => {
          console.log(data, "data");
          setMyRecipes(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser]);

  const context = useMemo(
    () => ({
      currentUser,
      myRecipes,
      setCurrentUser,
      setMyRecipes,
    }),
    [currentUser, myRecipes, setCurrentUser, setMyRecipes]
  );
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

UserInfosContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
