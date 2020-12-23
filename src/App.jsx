import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* 

COLORS

very light cyan: #e3fdfd;
light cyan: #cbf1f5;
cyan: #a6e3e9;
dark cyan: #71c9ce;

*/

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6.25rem;
`;

const Button = styled.button`
  display: grid;
  place-items: center;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  font-size: 1.875rem;
  color: white;
  background-color: #a3ddcb;
  border: 1px solid #e8e9a1;

  transition: background-color 0.3s ease-in-out;

  &:hover  {
    background-color: #71c9ce;
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

const Number = styled.p`
  font-weight: 600;
`;

const Description = styled.p`
  overflow-x: hidden;
`;

const Card = ({ position, description }) => {
  return (
    <StyledCard>
      <Number>{position}</Number>
      <Description contentEditable>{description}</Description>
    </StyledCard>
  );
};

const App = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  var recognition = new SpeechRecognition();

  const [todoList, setTodoList] = useState([]);
  const [voiceInput, setVoiceInput] = useState({ value: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onRecognition = () => {
    recognition.start();

    recognition.onspeechstart = () => setIsLoading(true);
    recognition.onspeechend = () => setIsLoading(false);

    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        let transcriptResult = event.results[0][0].transcript;

        if (transcriptResult === "") {
          alert("I didn't really catch that, try again please");
        } else {
          setVoiceInput({ ...voiceInput, value: transcriptResult });
          setTodoList([...todoList, voiceInput.value]);
        }
      }
    };
  };

  useEffect(() => {
    setTodoList(["xD", "asdsad", "asdsad"]);
  }, []);

  return (
    <Main>
      <Button type="button" onClick={onRecognition}>
        {isLoading ? "..." : <ion-icon name="mic" />}
      </Button>

      <div>
        {todoList.map((description, index) => {
          return (
            <Card key={index} description={description} position={index + 1} />
          );
        })}
      </div>
    </Main>
  );
};

export default App;
