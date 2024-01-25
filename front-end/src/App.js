
import "./App.css";
import HeaderCom from "./components/header";
import ProductList from "./pages/product";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProductDetail from "./pages/productdetail/ProductDetail";
import ProductCategories from "./pages/categories";
import CreateProduct from "./pages/createproduct";
import NotFound from "./pages/notfound/Notfound";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalState } from "./GlobalState";
import RootLayout from "./layout/RootLayout";
import { AdminDashBoard } from "./pages/admin";
const App = () => {

  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  console.log("isAdmin", isAdmin, "isLogged", isLogged);

  if (window.location.pathname == '/') {
    window.location = "shopping"
  }
  return (
    <>
      <Router>
        <HeaderCom />
        {/* <CollapseMenu /> */}
        <div style={{ width: "100%", minHeigh: "100%" }}>
          <Routes>
            <Route path="shopping" element={<RootLayout />}>
              <Route index element={<ProductList />} />
              <Route path="detail/:id" element={<ProductDetail />} />
              <Route
                path="login"
                element={!isLogged ? <Login /> : <NotFound />}
              />
              <Route
                path="register"
                element={!isLogged ? <Register /> : <NotFound />}
              />
              <Route
                path="categories"
                element={isAdmin ? <ProductCategories /> : <NotFound />}
              />
              <Route
                path="create_product"
                element={isAdmin ? <CreateProduct /> : <NotFound />}
              />
              <Route
                path="edit_product/:id"
                element={isAdmin ? <CreateProduct /> : <NotFound />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>

    </>
  );
};

export default App;
