import React from 'react';
import Oils from './../assets/charisse-kenion.jpg';
import Supplement from './../assets/ferenc-horvath.jpg';
import './styles.scss';

const Directory = (props) => {
  return (
    <div className='directory'>
      <div className='directory__wrapper'>
        <div
          className='directory__item'
          style={{
            backgroundImage: `url(${Oils})`
          }}>
          <a href='#' className='directory__link'>
            Essential Oils
          </a>
        </div>
        <div
          className='directory__item'
          style={{
            backgroundImage: `url(${Supplement})`
          }}>
          <a href='#' className='directory__link'>
            Supplements
          </a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
