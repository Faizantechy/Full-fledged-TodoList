import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "./TodosSlice";

export const store = configureStore({
  reducer: { Todos: TodosReducer },
});
