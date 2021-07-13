import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { checkUserSession } from './redux/user/user.actions';

import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import AdminToolbar from './components/admin_toolbar';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import './default.scss';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [checkUserSession]);

  return (
    <div className='app'>
      <AdminToolbar />
      <Switch>
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
        <Route
          path='/login'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path='/recovery'
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path='/dashboard'
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path='/admin'
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
