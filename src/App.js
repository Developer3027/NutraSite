import React from 'react';
import Header from './components/header/index';
import SocialBar from './components/social_bar/index';
import Home from './components/pages/home/index';
import './default.scss';

const App = () => {
  return (
    <div className='app'>
      <SocialBar />
      <Header />
      <div className='main'>
        <Home />
      </div>
    </div>
  );
};

export default App;
