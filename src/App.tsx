import React, { useState } from "react";
import styled from "styled-components";

import { Cookies } from "./components/Cookies";
import { Dashboard } from "./dashboard";
import { Header } from "./components/Header";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const App = () => {
  const [showCompletedList, setShowCompletedList] = useState(false);

  return (
    <Main>
      <Header
        setShowCompletedList={setShowCompletedList}
        showCompletedList={showCompletedList}
      />
      <Dashboard showCompletedList={showCompletedList} />
      <Cookies />
    </Main>
  );
};

export default App;
