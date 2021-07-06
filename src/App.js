import React from 'react';
import { Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './components/pages/home/index';
import Registration from './components/pages/registration/index';
import './default.scss';

const App = () => {
  return (
    <div className='app'>
      <Route
        exact
        path='/'
        render={() => (
          <HomeLayout>
            <Home />
          </HomeLayout>
        )}
      />
      <Route
        path='/registration'
        render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )}
      />
    </div>
  );
};

export default App;
