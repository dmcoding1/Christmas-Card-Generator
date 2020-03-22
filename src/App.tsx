import React from 'react';
import './Styles/reset.scss';
import './App.scss';
import Header from './Components/Layout/Header';
import Main from './Components/Layout/Main';
import Footer from './Components/Layout/Footer';
import Canvas from './Components/Canvas/Canvas';
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
