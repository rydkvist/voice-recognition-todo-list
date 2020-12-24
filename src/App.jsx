import React, { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import styled, { css } from "styled-components";
import { useTodoList } from "./TodoContext";
import { Card } from "./Card";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  height: 15vh;
  margin-bottom: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  display: grid;
  place-items: center;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  font-size: 2.25rem;
  color: white;
  background-color: #71c9ce;
  border: 2px solid #a6e3e9;
  box-shadow: 0px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #a6e3e9;
  }
  &:focus {
    box-shadow: 0px 0px 5px 2px rgba(163, 221, 203, 0.75);
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
  margin-top: 4.625rem;
  margin-bottom: 0.75rem;
  text-align: center;
  padding: 0rem 1.25rem;
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
  const { todoList, setTodoList } = useTodoList();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  var recognition = new SpeechRecognition();

  const [isListening, setIsListening] = useState(false);

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

  return (
    <Main>
      <Header>
        <Copyright href="https://www.niklasrydkvist.com" target="_blank">
          © Niklas Rydkvist
        </Copyright>
        <Title>Press the Microphone to add a new Task</Title>
        <Button
          type="button"
          onClick={isListening ? stopListening : onRecognition}
          title="Add a new task"
        >
          {isListening ? <Spinner /> : <ion-icon name="mic" />}
        </Button>
        <Label isVisible={isListening}>Listening...</Label>
      </Header>

      <List>
        {todoList.map((item, index) => (
          <Card key={index} description={item.value} position={item.id} />
        ))}
      </List>
    </Main>
  );
};

export default App;
