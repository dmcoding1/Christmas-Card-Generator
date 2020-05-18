import React from 'react';

import AppContextProvider from './Context/AppContextProvider';
import Canvas from './Components/Canvas';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';

import './Styles/reset.scss';
import './App.scss';

const App: React.FC = () => {

  return (
    <AppContextProvider>
      <Header />
      <Main />
      <Footer />
      <Canvas />
    </AppContextProvider>
  );
};

export default App;
