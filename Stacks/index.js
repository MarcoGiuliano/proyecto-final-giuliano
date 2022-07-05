import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Logged from "./Logged";
import Auth from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import MainTab from "../Tabs/mainTab";
import { getDataUser } from "../Reducers/user";

const MainNavigator = () => {
  const userLogged = false;

  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  console.log(user);

  return (
    // <NavigationContainer>
    //   {user.userId === "" ? <Auth /> : <MainTab />}
    // </NavigationContainer>
    <NavigationContainer>
      {user.userId === "" || user.userId === undefined ? <Auth /> : <MainTab />}
    </NavigationContainer>
  );
};

export default MainNavigator;
