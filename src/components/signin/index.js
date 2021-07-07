import React, { Component } from 'react';
import Buttons from '../forms/button';
import { signInWithGoogle } from '../../firebase/utilis';
import './styles.scss';

class Signin extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className='signin'>
        <div className='signin__wrapper'>
          <h2>Log In</h2>
          <div className='signin__form__wrapper'>
            <form onSubmit={this.handleSubmit}>
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

export default Signin;
