import styled from "styled-components";
import { useTodoList, TodoItemType } from "../context/TodoContext";
import { Task, CompletedTask } from "../components/Task";

const List = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;

export const Dashboard = ({ showCompletedList }: any) => {
  const { todoList, completedTodoList } = useTodoList();

  return (
    <List>
      {showCompletedList
        ? completedTodoList.map((item: TodoItemType, index: number) => (
            <CompletedTask key={index} description={item.value} />
          ))
        : todoList.map((item: TodoItemType, index: number) => (
            <Task
              key={index}
              description={item.value}
              position={item.id}
              bg={item.bg}
              borderColor={item.borderColor}
            />
          ))}
    </List>
  );
};
