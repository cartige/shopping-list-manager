import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import MyLists from "./pages/MyLists/MyLists";
import "./reset.scss";
import "./App.scss";
import { UserInfosContext } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/mylists" element={<MyLists />} />
      </Routes>
    </Router>
  );
}

export default App;
