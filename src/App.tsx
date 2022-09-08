import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Tiles from "./components/Tiles";
import constants from "./constants";
import { WordleContextProvider } from "./contexts/wordleContext";
import services from "./services";

const Main = styled.div`
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  height: calc(100% - ${constants.TITLE_HEIGHT});
`;

const App: React.FC<any> = () => {
  useEffect(() => {
    services.getRandomWord().then((result) => {
      console.log("Get Random Word", result);
    });
  }, []);
  return (
    <>
      <Header />
      <Main>
        <WordleContextProvider>
          <Tiles />
          <Keyboard />
        </WordleContextProvider>
      </Main>
    </>
  );
};

export default App;
