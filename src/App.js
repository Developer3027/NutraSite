import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utilis';
import { setCurrentUser } from './redux/user/user.actions';

import WithAuth from './hoc/withAuth';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';
import Dashboard from './pages/dashboard';
import './default.scss';

const App = (props) => {
  const { setCurrentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className='app'>
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
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
