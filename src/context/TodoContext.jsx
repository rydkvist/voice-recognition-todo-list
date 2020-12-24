import React, { createContext, useState, useEffect, useContext } from "react";

const TodoListContext = createContext();

export const useTodoList = () => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error("Cannot use useTodoList outside of TodoListProvider");
  }
  return context;
};

/* 
  Features: 
  - Make it able to add tasks manually
  - Make it able to sort the task, so that they are draggable
  - Make it able to edit the description/content of each task
  - Change "Be done with a task first! :)" message when you add a better UI for the completed dashboard
  - Update to have nicer UI
*/

const initialState = [
  { id: 1, value: "Welcome! Here you can add, remove, and finish tasks" },
  { id: 2, value: "They will be saved on your local device automatically :)" },
  { id: 3, value: "You can also choose to add them with voice recognition" },
  { id: 4, value: "Or just manually typing the tasks!" },
];

const localState = JSON.parse(localStorage.getItem("todoListStorage"));
const localCompletedState = JSON.parse(
  localStorage.getItem("completedTodoListStorage")
);

export const TodoListProvider = ({ children }) => {
  const [todoList, setTodoList] = useState(localState || initialState);
  const [completedTodoList, setCompletedTodoList] = useState(
    localCompletedState || []
  );

  const amountOfCompletedTasks = completedTodoList.length;

  const onRemoveTask = (itemId) => {
    // remove selected item from list
    const tempNewList = todoList.filter((item) => item.id !== itemId);

    // add new id to every item after the removal
    const newList = tempNewList.map((item, index) => {
      return { id: index, value: item.value };
    });

    setTodoList(newList);
  };

  const onTaskDone = (itemId) => {
    // Add task to the completed list of tasks
    const task = todoList.find((item) => item.id === itemId);
    setCompletedTodoList([...completedTodoList, task]);

    onRemoveTask(itemId);
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
        onTaskDone,
        onRemoveTask,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
