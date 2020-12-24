import React, { createContext, useState, useEffect, useContext } from "react";
import { taskColors } from "../components/Task";

export type TodoItemType = {
  id: number;
  value: string;
  bg: string;
  borderColor: string;
};

const TodoListContext = createContext({
  todoList: [],
  completedTodoList: [],
  setTodoList: (data: any) => {},
  setCompletedTodoList: (data: any) => {},
  amountOfCompletedTasks: 0,
  onChangeTaskColor: (itemId: number, bg: string, borderColor: string) => {},
  onTaskDone: (itemId: number) => {},
  onRemoveTask: (itemId: number) => {},
});

export const useTodoList = () => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("Cannot use useTodoList outside of TodoListProvider");
  }
  return context;
};

/* 
  Features: 
  - Change "Be done with a task first! :)" message when you add a better UI for the completed dashboard
  - Add jest tests
  - Update to have nicer UI
*/

const initialState: TodoItemType[] = [
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

const localState = JSON.parse(
  localStorage.getItem("todoListStorage") || JSON.stringify(initialState)
);
const localCompletedState = JSON.parse(
  localStorage.getItem("completedTodoListStorage") || "[]"
);

export const TodoListProvider = ({ children }: any) => {
  const [todoList, setTodoList] = useState(localState);
  const [completedTodoList, setCompletedTodoList] = useState(
    localCompletedState
  );

  const amountOfCompletedTasks = completedTodoList.length;

  const onRemoveTask = (itemId: number) => {
    // remove selected item from list
    const tempNewList = todoList.filter(
      (item: TodoItemType) => item.id !== itemId
    );

    // add a new id to every item after the removal
    const newList = tempNewList.map((item: TodoItemType, index: number) => {
      return { ...item, id: index };
    });

    setTodoList(newList);
  };

  const onTaskDone = (itemId: number) => {
    const task = todoList.find((item: TodoItemType) => item.id === itemId);

    // Add task to the completed list of tasks
    setCompletedTodoList([...completedTodoList, task]);

    onRemoveTask(itemId);
  };

  const onChangeTaskColor = (
    itemId: number,
    bg: string,
    borderColor: string
  ) => {
    // Create a new list with the edited color of the task
    const newList = todoList.map((item: TodoItemType) => {
      return item.id === itemId ? { ...item, bg: bg, borderColor } : item;
    });

    setTodoList(newList);
  };

  useEffect(() => {
    localStorage.setItem("todoListStorage", JSON.stringify(todoList));
    localStorage.setItem(
      "completedTodoListStorage",
      JSON.stringify(completedTodoList)
    );
  }, [completedTodoList, todoList]);

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        completedTodoList,
        amountOfCompletedTasks,
        setTodoList,
        setCompletedTodoList,
        onTaskDone,
        onRemoveTask,
        onChangeTaskColor,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
