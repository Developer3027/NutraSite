import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms
} from './../../redux/user/user.actions';
import { Link, withRouter } from 'react-router-dom';

import Buttons from '../forms/button';
import FormInput from './../forms/form_input';

import AuthWrapper from './../auth_wrapper';

import './styles.scss';

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
});

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const ConfigAuthWrapper = {
    headline: 'Login'
  };

  return (
    <AuthWrapper {...ConfigAuthWrapper}>
      <div className='signin__form__wrapper'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Buttons type='submit'>LogIn</Buttons>

          <div className='signin__social'>
            <div className='signin__row'>
              <Buttons onClick={handleGoogleSignIn}>
                Sign In with Google
              </Buttons>
            </div>
          </div>

          <div className='signin__links'>
            <Link to='/recovery'>
              <span>Reset Password</span>
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
