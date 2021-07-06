import React from 'react';
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter
} from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './styles.scss';

const SocialBar = () => {
  return (
    <div className='social'>
      <div className='social__number'>
        <p>1(888) 555-1234</p>
      </div>
      <div className='social__icons'>
        <IconContext.Provider value={{ className: 'social__icon' }}>
          <AiOutlineFacebook />
          <AiOutlineInstagram />
          <AiOutlineTwitter />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default SocialBar;
