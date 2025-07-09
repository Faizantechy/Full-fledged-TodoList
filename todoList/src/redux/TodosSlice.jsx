import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTodos: [],
  selectedTodoId: "",
  gottonItem: "",
};

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    allLies: (state, action) => {
      state.allTodos = action.payload;
      if (action.payload) {
        console.log(action.payload, "Redux Items");
      } else {
        console.log("Couldn't Receive the Todo Items in Redux");
      }
    },
    getSelectedTodos: (state, action) => {
      state.selectedTodoId = action.payload;
      console.log(state.selectedTodoId, "Redux Received ID");
    },
    getItem: (state, action) => {
      const matcheditem = state.allTodos.find(
        (item) => state.selectedTodoId === item.$id
      );

      if(matcheditem){
        state.gottonItem=matcheditem
        console.log("item Got",state.gottonItem)
      } else{

        console.log("Couldn't get the Item")
      }
    },
  },
});

export const { getSelectedTodos, allLies,getItem } = TodosSlice.actions;
export default TodosSlice.reducer;
