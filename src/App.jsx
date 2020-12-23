import React, { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
import styled, { css } from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3.125rem;
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

  &:hover  {
    background-color: #a6e3e9;
  }
  &:focus {
    box-shadow: 0px 0px 5px 2px rgba(163, 221, 203, 0.75);
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 1.25rem;
  width: 12.5rem;
  border-radius: 8px;
  background-color: #e3fdfd;
  margin: 1.25rem 0rem;
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 1.875rem;
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

const Number = styled.p`
  font-weight: 600;
`;

const Description = styled.p`
  overflow-x: hidden;
`;

const Card = ({ position, description }) => (
  <StyledCard>
    <Number>{position}</Number>
    <Description>{description}</Description>
  </StyledCard>
);

const App = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  var recognition = new SpeechRecognition();

  const [todoList, setTodoList] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const onRecognition = () => {
    recognition.start();

    recognition.onspeechstart = () => setIsListening(true);
    recognition.onspeechend = () => setIsListening(false);

    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        let transcriptResult = event.results[0][0].transcript;

        if (!transcriptResult) {
          alert("I didn't really catch that, try again please");
        } else {
          setTodoList([
            ...todoList,
            { id: todoList.length, value: transcriptResult },
          ]);
        }
      }
    };
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <Main>
      <Title>Press the Microphone to add a new Task</Title>
      <Button type="button" onClick={onRecognition}>
        {isListening ? <Spinner /> : <ion-icon name="mic" />}
      </Button>
      <Label isVisible={isListening}>Listening...</Label>

      <div>
        {todoList.map((item) => (
          <Card key={item.id} description={item.value} position={item.id + 1} />
        ))}
      </div>
    </Main>
  );
};

export default App;
