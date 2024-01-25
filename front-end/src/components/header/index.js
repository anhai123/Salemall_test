import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Typography,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Space,
  Badge,
} from "antd";
import "./header.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import { GlobalState } from "../../GlobalState";
import { debounce } from "../../helper/debounce";
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const HeaderCom = () => {
  const location = useLocation();
  let routePathPattern = location.pathname;
  console.log("routePathPattern", routePathPattern);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;
  const [searchLocal, setSearchLocal] = useState('');
  const [categories] = state.categoriesAPI.categories;
  const [categorySelected, setCategorySelected] =
    state.productsAPI.categorySelected;
  let searchDebounce = (valueSearch) => {
    setSearchLocal(valueSearch.target.value)
    debouncedSearch(valueSearch.target.value)
  }
  const debouncedSearch = useCallback(debounce((searchTextReturnFromDebounceHelper) => {
    setSearch(searchTextReturnFromDebounceHelper)
  }, 1000), []);
  const handleCategory = (value) => {
    setCategorySelected(value);
    setSearch("");
  };
  const logoutUser = async () => {
    authService.logout();

    window.location.pathname = `${state.API_ONLY_HREF}`; // refresh page
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const adminRouter = [
    {
      key: "create_product",
      label: <Link to={`${state.API_ONLY_HREF}create_product`}>Thêm SP</Link>,
    },
    {
      key: "categories",
      label: <Link to={`${state.API_ONLY_HREF}categories`}>Danh mục</Link>,
    },
    isLogged && {
      key: "logout",
      label: (
        <Link to={`${state.API_ONLY_HREF}`} onClick={logoutUser}>
          Đăng xuất
        </Link>
      ),
    },
  ];

  const loggedRouter = [
    isLogged && {
      key: "logout",
      label: (
        <Link to={`${state.API_ONLY_HREF}`} onClick={logoutUser}>
          Đăng xuất
        </Link>
      ),
    },

  ];

  let ItemsNavbar = [
    !isLogged && {
      key: "loginRegis",
      label: <Link to={`${state.API_ONLY_HREF}login`}> Đăng nhập</Link>,
    },

    ...loggedRouter,
  ];
  if (isAdmin) {
    ItemsNavbar = [
      ...adminRouter,
    ];
  }
  let ItemsCategory = [];
  let getAllProduct = {
    key: "allProduct",
    label: (
      <span onClick={() => handleCategory("")} key="allProduct">
        Tất cả sản phẩm
      </span>
    ),
  };
  if (categories) {
    ItemsCategory = categories.map((category) => {
      return {
        key: category._id,
        label: (
          <span
            onClick={() => handleCategory("category=" + category._id)}
            key={category._id}
          >
            {category.name}
          </span>
        ),
      };
    });
  }

  ItemsCategory = [getAllProduct].concat(ItemsCategory);

  return (
    <Layout style={{ boxSizing: "border-box", position: "sticky", top: "0px", zIndex: "10", minHeight: '50px' }}>
      <div className="layout" >
        <Header >
          <div className="site-space-compact-wrapper">
            <Space.Compact block>
              <Text
                style={{
                  color: "white",
                  width: "10%",
                  minWidth: '189px',
                  position: "relative",
                  fontSize: "1.438rem",

                  margin: 'auto',
                  marginRight: '0px',
                  marginLeft: '0px'
                }}
                italic
              >
                <Link to={`${state.API_ONLY_HREF}`}>{isAdmin ? "Admin" : "Kaimono"}</Link>
              </Text>
              <Input.Search
                style={{
                  position: "relative",
                  width: "40%",
                  maxWidth: "60%",
                  transform: "translate(0%, 25%)",
                }}
                defaultValue="0571"
                value={searchLocal}
                onChange={searchDebounce}
              />

              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={ItemsNavbar}
                style={{
                  width: "45%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              />

              <br />
            </Space.Compact>


          </div>
        </Header>
      </div>

    </Layout>

  );
};
export default HeaderCom;
