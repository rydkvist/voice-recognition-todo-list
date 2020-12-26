import React, { useState, useEffect } from "react";
import { Spinner } from "./components/Spinner";
import styled, { css } from "styled-components";
import { useTodoList, TodoItemType } from "./context/TodoContext";
import { Task, CompletedTask, taskColors } from "./components/Task";
import { Button } from "./components/Button";
import { colors } from "./utils/colors";
import { Cookies } from "./components/Cookies";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: ${colors.darkCyan};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Group = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  & > button {
    margin-right: 0.9375rem;
  }
`;

const Copyright = styled.a`
  position: absolute;
  font-size: 0.75rem;
  margin-top: 0.3125rem;
  margin-right: 0.625rem;
  top: 0;
  right: 0;
  color: white;
  text-decoration: none;
  line-height: 1.2;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    opacity: 0.75;
    border-bottom: 1px solid white;
  }
`;

const Title = styled.h3<{ isVisible: boolean }>`
  color: white;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  text-align: center;
  padding: 0rem 1.25rem;
  opacity: 1;
  height: 100%;

  transition: all 2s ease-out;

  ${(props) =>
    !props.isVisible &&
    css`
      opacity: 0;
      height: 0;
    `}
`;

const Label = styled.p<{ isVisible: boolean }>`
  margin-top: 0.625rem;
  font-size: 0.875rem;
  text-align: center;
  opacity: 0.75;
  color: white;
  ${(props) =>
    css`
      visibility: ${props.isVisible ? "visible" : "hidden"};
    `}
`;

const List = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;

const App = () => {
  const {
    todoList,
    completedTodoList,
    setTodoList,
    amountOfCompletedTasks,
  } = useTodoList();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition || "";

  var recognition = SpeechRecognition && new SpeechRecognition();

  const [isListening, setIsListening] = useState(false);

  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const onRecognition = (e: any) => {
    e.preventDefault();
    if (recognition) {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event) => {
        if (event.results.length > 0) {
          const transcriptResult = event.results[0][0].transcript;

          if (!transcriptResult) {
            alert("Sorry, I didn't catch that, could you try again please?");
          } else {
            setTodoList([
              ...todoList,
              {
                id: todoList.length,
                value: transcriptResult,
                ...taskColors[0],
              },
            ]);
          }
        }
        setIsListening(false);
      };
    } else {
      alert("You can't use speech recognition on this device :(");
    }
  };

  const onAddTask = () => {
    const taskDescription = prompt("Describe your task");
    setTodoList([
      ...todoList,
      { id: todoList.length, value: taskDescription, ...taskColors[0] },
    ]);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  const onChangeDashboard = () =>
    amountOfCompletedTasks === 0
      ? alert("Be done with a task first! :)")
      : setShowCompletedTasks(!showCompletedTasks);

  return (
    <Main>
      <Header>
        <Copyright href="https://www.niklasrydkvist.com" target="_blank">
          © Niklas Rydkvist
        </Copyright>
        <Title isVisible={amountOfCompletedTasks < 3}>
          Press the Microphone to add a new Task
        </Title>

        <Group>
          <Button
            type="button"
            onClick={isListening ? stopListening : onRecognition}
            title="Add a new task"
          >
            {isListening ? <Spinner /> : <ion-icon name="mic" />}
          </Button>
          <Button type="button" onClick={onAddTask} title="Add a new task">
            <ion-icon name="add-outline" />
          </Button>
          <Button
            onClick={onChangeDashboard}
            title={
              showCompletedTasks ? "Show current tasks" : "Show completed tasks"
            }
          >
            <ion-icon name="repeat" />
          </Button>
        </Group>

        <Label isVisible={true}>Tasks done: {amountOfCompletedTasks}</Label>
        <Label isVisible={isListening}>Listening...</Label>
      </Header>

      <List>
        {showCompletedTasks
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
      <Cookies />
    </Main>
  );
};

export default App;
