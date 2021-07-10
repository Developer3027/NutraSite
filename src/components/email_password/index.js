import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from './../../firebase/utilis';

import Buttons from './../forms/button';
import FormInput from './../forms/form_input';

import AuthWrapper from './../auth_wrapper';

const EmailPassword = (props) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mailConfig = {
        url: 'http://localhost:3000/login'
      };

      await auth
        .sendPasswordResetEmail(email, mailConfig)
        .then(() => {
          props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found'];
          setErrors(err);
        });
    } catch (error) {
      console.error('Failed email password: ', error);
    }
  };

  const configAuthWrapper = {
    headline: 'Email Password'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='form__wrapper'>
        {errors.length > 0 && (
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Buttons type='submit'>Email Password</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
