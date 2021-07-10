import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Buttons from '../forms/button';
import FormInput from './../forms/form_input';
import { signInWithGoogle, auth } from '../../firebase/utilis';

import AuthWrapper from './../auth_wrapper';

import './styles.scss';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push('/');
    } catch (err) {
      console.error('Failed to log in: ', err.code);
    }
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
              <Buttons onClick={signInWithGoogle}>Sign In with Google</Buttons>
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
