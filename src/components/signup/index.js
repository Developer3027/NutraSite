import React, { Component } from 'react';
import './styles.scss';

import AuthWrapper from './../auth_wrapper';

import FormInput from '../forms/form_input';
import Buttons from '../forms/button';

import { auth, handleUserProfile } from './../../firebase/utilis';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      this.setState({
        errors: err
      });
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState
      });
    } catch (err) {
      console.error('Failed to register', err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

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
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              placeholder='Full Name'
              onChange={this.handleChange}
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={this.handleChange}
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              onChange={this.handleChange}
            />
            <Buttons type='submit'>Register</Buttons>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignUp;
