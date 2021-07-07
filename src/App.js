import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utilis';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';
import './default.scss';

const App = () => {
  const [member, setMember] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await handleUserProfile(user);
        userRef.onSnapshot((snapshot) => {
          setMember({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }
      setMember(null);
    });
  }, []);

  return (
    <div className='app'>
      <Route
        exact
        path='/'
        render={() => (
          <HomeLayout member={member}>
            <Home />
          </HomeLayout>
        )}
      />
      <Route
        path='/registration'
        render={() =>
          member ? (
            <Redirect to='/' />
          ) : (
            <MainLayout member={member}>
              <Registration />
            </MainLayout>
          )
        }
      />
      <Route
        path='/login'
        render={() =>
          member ? (
            <Redirect to='/' />
          ) : (
            <MainLayout member={member}>
              <Login />
            </MainLayout>
          )
        }
      />
    </div>
  );
};

export default App;
