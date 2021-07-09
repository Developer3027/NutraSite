import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { auth, handleUserProfile } from './firebase/utilis';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';
import './default.scss';

class App extends Component {
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
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
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

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
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path='/login'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            exact
            path='/recovery'
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
