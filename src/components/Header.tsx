import React, { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import styled, { css } from "styled-components";
import { useTodoList, TodoItemType } from "../context/TodoContext";
import { taskColors } from "./Task";
import { Button } from "./Button";
import { colors } from "../utils/colors";

import { getListTitle, storeListTitle } from "../utils/localStorage";

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
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

const Title = styled.input`
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  text-align: center;
  padding: 0rem 1.25rem;
  opacity: 1;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 80vw;
  cursor: text;
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

export const Header = ({ setShowCompletedList, showCompletedList }: any) => {
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

  const [listTitle, setListTitle] = useState(getListTitle());
  const onChangeTitle = (e: any) => setListTitle(e.target.value);

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
    taskDescription &&
      setTodoList([
        ...todoList,
        { id: todoList.length, value: taskDescription, ...taskColors[0] },
      ]);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  const onChangeDashboard = () =>
    amountOfCompletedTasks === 0
      ? alert("Be done with a task first! :)")
      : setShowCompletedList(!showCompletedList);

  useEffect(() => {
    storeListTitle(listTitle);
  }, [listTitle]);

  return (
    <StyledHeader>
      <Copyright href="https://www.niklasrydkvist.com" target="_blank">
        © Niklas Rydkvist
      </Copyright>
      <Title onChange={onChangeTitle} value={listTitle} />

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
            showCompletedList ? "Show current tasks" : "Show completed tasks"
          }
        >
          <ion-icon name="repeat" />
        </Button>
      </Group>

      <Label isVisible={true}>Tasks done: {amountOfCompletedTasks}</Label>
      <Label isVisible={isListening}>Listening...</Label>
    </StyledHeader>
  );
};
