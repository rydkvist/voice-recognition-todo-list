import React, { useState } from "react";
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
  padding-top: 12.5rem;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 1.25rem;
  width: 12.5rem;
  border-radius: 8px;
  background-color: #e3fdfd;
`;

const Button = styled.button`
  display: grid;
  align-items: center;
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

const App = () => {
  const [voiceInput, setVoiceInput] = useState("");

  const onChange = (e) => setVoiceInput(e.target.value);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  var recognition = new SpeechRecognition();

  const onRecognition = (e) => {
    recognition.start();

    recognition.onresult = function (event) {
      if (event.results.length > 0) {
        setVoiceInput(event.results[0][0].transcript);
        // query.form.submit();
      }
    };
  };

  return (
    <Main>
      <Button type="button" onClick={onRecognition}>
        +
      </Button>
      <Card>
        <p>#1</p>
        <p>{voiceInput}</p>
      </Card>
    </Main>
  );
};

export default App;
