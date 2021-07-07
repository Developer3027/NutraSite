import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utilis';
import './styles.scss';
import Logo from '../../assets/fbprofile.png';

const Header = (props) => {
  const { member } = props;
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={Logo} alt='Nutra Site' />
          </Link>
        </div>
        <div className='header__cta'>
          {member && (
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>Log Out</span>
              </li>
            </ul>
          )}
          {!member && (
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
