import React from 'react';

import Toast from './components/common/Toast';
import Header from './components/Header';
import Wordle from './components/Wordle';
import { WordleContextProvider } from './contexts/wordleContext';

const App: React.FC<any> = () => {
  return (
    <>
      <Header />
      <WordleContextProvider>
        <Wordle />
      </WordleContextProvider>
      <Toast />
    </>
  );
};

export default App;
