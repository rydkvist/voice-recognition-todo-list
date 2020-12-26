import { taskColors } from "../components/Task";
import { TodoItemType } from "../context/TodoContext";

const initialTodoListState: TodoItemType[] = [
  {
    id: 0,
    value: "Welcome! Here you can add, remove, and finish tasks",
    ...taskColors[0],
  },
  {
    id: 1,
    value: "They will be saved on your local device automatically :)",
    ...taskColors[1],
  },
  {
    id: 2,
    value: "You can also choose to add them with voice recognition",
    ...taskColors[2],
  },
  {
    id: 3,
    value: "Or just manually typing the tasks!",
    ...taskColors[3],
  },
];

// TODO List Storage

export const getTodoList = () =>
  JSON.parse(
    localStorage.getItem("todoListStorage") ||
      JSON.stringify(initialTodoListState)
  );

export const storeTodoList = (todoList: TodoItemType[]) =>
  localStorage.setItem("todoListStorage", JSON.stringify(todoList));

export const getCompletedTodoList = () =>
  JSON.parse(localStorage.getItem("completedTodoListStorage") || "[]");

export const storeCompletedTodoList = (completedList: TodoItemType[]) =>
  localStorage.setItem(
    "completedTodoListStorage",
    JSON.stringify(completedList)
  );

// TODO List Title Storage

export const getListTitle = () =>
  JSON.parse(
    localStorage.getItem("listTitle") ||
      JSON.stringify("TODO (change title with click)")
  );

export const storeListTitle = (title: string) =>
  localStorage.setItem("listTitle", JSON.stringify(title));

// Cookies Storage

export const getAcceptedCookies = () =>
  JSON.parse(localStorage.getItem("acceptedCookies") || JSON.stringify(""));

export const storeAcceptedCookies = (answer: string) =>
  localStorage.setItem("acceptedCookies", JSON.stringify(answer));
