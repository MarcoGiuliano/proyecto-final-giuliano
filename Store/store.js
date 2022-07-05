import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/auth";
import userReducer from "../Reducers/user";
import addReducer from "../Reducers/add";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    add: addReducer,
  },
});

export default store;
