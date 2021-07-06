import React from 'react';
import './styles.scss';
import Logo from '../../assets/fbprofile.png';

const Header = () => {
  return (
    <header className='header'>
      <div className='wrapper'>
        <div className='logo'>
          <img src={Logo} alt='Nutra Site' />
        </div>
      </div>
    </header>
  );
};

export default Header;
