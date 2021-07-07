import React, { Component } from 'react';
import Buttons from '../forms/button';
import FormInput from './../forms/form_input';
import { signInWithGoogle, auth } from '../../firebase/utilis';

import './styles.scss';

const initialState = {
  email: '',
  password: ''
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState
      });
    } catch (err) {
      console.error('Failed to log in: ', err.code);
    }
  };

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className='signin'>
        <div className='signin__wrapper'>
          <h2>Log In</h2>
          <div className='signin__form__wrapper'>
            <form onSubmit={this.handleSubmit}>
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

              <Buttons type='submit'>LogIn</Buttons>

              <div className='signin__social'>
                <div className='signin__row'>
                  <Buttons onClick={signInWithGoogle}>
                    Sign In with Google
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
