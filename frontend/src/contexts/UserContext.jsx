import { createContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";
// import swal from "sweetalert";

const UserContext = createContext({
  currentUser: {},
});
export default UserContext;

export function UserInfosContext({ children }) {
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
  });

  const context = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser]
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
