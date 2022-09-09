import React from 'react';

import Header from './components/Header';
import Wordle from './components/Wordle';

const App: React.FC<any> = () => {
  return (
    <>
      <Header />
      <Wordle />
    </>
  );
};

export default App;
