import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertsSlice from "./alertSlice";
import usersSlice from "./usersSlice";

//why to write this slice?
//so whenever we refresh the page the logic in the protected route will be executed
//which is validateToken so we will get user object from backend
//so whenever I get that I want to put the data in reducer
//so thats why we use const dispatch
const rootReducer = combineReducers({
  alerts: alertsSlice,
  users: usersSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;