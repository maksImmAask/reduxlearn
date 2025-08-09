import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todos } from "../../types/todos-types";

interface TodosState {
  activeTodos: Todos[];
  completedTodos: Todos[];
}

const initialState: TodosState = {
  activeTodos: [],
  completedTodos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todos>) => {
      state.activeTodos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.activeTodos = state.activeTodos.filter(todo => todo.id !== action.payload);
      state.completedTodos = state.completedTodos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      if (state.activeTodos.findIndex(todo => todo.id === action.payload) !== -1) {
        const [todo] = state.activeTodos.splice(state.activeTodos.findIndex(todo => todo.id === action.payload), 1);
        state.completedTodos.push({ ...todo, completed: true });
        return;
      }

    
      if (state.completedTodos.findIndex(todo => todo.id === action.payload) !== -1) {
        const [todo] = state.completedTodos.splice(state.completedTodos.findIndex(todo => todo.id === action.payload), 1);
        state.activeTodos.push({ ...todo, completed: false });
      }
    },
  },
});

export const { createTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
