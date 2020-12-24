import React, { useState, useEffect } from "react";
import { Spinner } from "./components/Spinner";
import styled, { css } from "styled-components";
import { useTodoList } from "./context/TodoContext";
import { Task, CompletedTask } from "./components/Task";
import { Button } from "./components/Button";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  height: 100%;
  width: 100%;
  display: flex;
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

const Title = styled.h3`
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

const Label = styled.p`
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
  height: 80vh;
  width: 100%;
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
    window.SpeechRecognition || window.webkitSpeechRecognition;

  var recognition = new SpeechRecognition();

  const [isListening, setIsListening] = useState(false);

  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const onRecognition = (e) => {
    e.preventDefault();
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
            { id: todoList.length, value: transcriptResult },
          ]);
        }
      }
      setIsListening(false);
    };
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
          <Button
            fontSize="1.5rem"
            size="2.5rem"
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
          ? completedTodoList.map((item, index) => (
              <CompletedTask key={index} description={item.value} />
            ))
          : todoList.map((item, index) => (
              <Task key={index} description={item.value} position={item.id} />
            ))}
      </List>
    </Main>
  );
};

export default App;
