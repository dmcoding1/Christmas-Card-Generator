import React from 'react';
import './Styles/reset.scss';
import './App.scss';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Canvas from './Components/Canvas';
import AppContextProvider from './Context/AppContextProvider';

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
