import { initialState as initialTodoListState } from "../context/TodoContext";

export const getTodoList = () =>
  JSON.parse(
    localStorage.getItem("todoListStorage") ||
      JSON.stringify(initialTodoListState)
  );

export const getCompletedList = () =>
  JSON.parse(localStorage.getItem("completedTodoListStorage") || "[]");
