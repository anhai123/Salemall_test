import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
const user = JSON.parse(localStorage.getItem("user"));
const UserAPI = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [statisticInfo, setStatisticInfo] = useState([])

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const response = await userService.getUser(user.id);
          setUserInfo(response);
          setIsLogged(true);
          if (user.roles.includes("ROLE_ADMIN")) {
            setIsAdmin(true)
            // const response = await paymentService.getPayment();
            // const statistic = await adminService.statistic()
            console.log('thong tin admin lay ve tu be')

            // setHistory(response);
            // setStatisticInfo(statistic)
          }
          else {
            setIsAdmin(false);
          }
          // setCart(response.cart);
          console.log(response);
        } catch (error) {
          alert(error);
        }
      };
      getUser();
    }
  }, [user]);

  return {
    userInfo: [userInfo, setUserInfo],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    callback: [callback, setCallback],
  };
};

export default UserAPI;
