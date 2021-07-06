import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Logo from '../../assets/fbprofile.png';

const Header = (props) => {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={Logo} alt='Nutra Site' />
          </Link>
        </div>
        <div className='header__cta'>
          <ul>
            <li>
              <Link to='/registration'>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
