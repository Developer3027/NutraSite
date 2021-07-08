import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from './../../firebase/utilis';

import Buttons from './../forms/button';
import FormInput from './../forms/form_input';

import AuthWrapper from './../auth_wrapper';

const initialState = {
  email: '',
  errors: ''
};

export class EmailPassword extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const mailConfig = {
        url: 'http://localhost:3000/login'
      };

      await auth
        .sendPasswordResetEmail(email, mailConfig)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found'];
          this.setState({
            errors: err
          });
        });
    } catch (error) {
      console.error('Failed email password: ', error);
    }
  };

  render() {
    const { email, errors } = this.state;

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
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
            <Buttons type='submit'>Email Password</Buttons>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
