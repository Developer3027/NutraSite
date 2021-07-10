import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUpUser, resetAllAuthForms } from './../../redux/user/user.actions';
import './styles.scss';

import AuthWrapper from './../auth_wrapper';

import FormInput from '../forms/form_input';
import Buttons from '../forms/button';

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
});

const SignUp = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUser({
        displayName,
        email,
        password,
        confirmPassword
      })
    );
  };

  const configAuthWrapper = {
    headline: 'Register'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='form__wrapper'>
        {errors.length > 0 &&
          errors.map((err, i) => {
            return (
              <ul>
                <li key={i}>{err}</li>
              </ul>
            );
          })}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full Name'
            handleChange={(e) => setDisplayName(e.target.value)}
          />
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
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Buttons type='submit'>Register</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignUp);
