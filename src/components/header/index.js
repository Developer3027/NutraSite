import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/utilis';
import './styles.scss';
import Logo from '../../assets/fbprofile.png';

const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={Logo} alt='Nutra Site' />
          </Link>
        </div>
        <div className='header__cta'>
          {currentUser && (
            <ul>
              <li>
                <Link to='/dashboard'>My Account</Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>Log Out</span>
              </li>
            </ul>
          )}
          {!currentUser && (
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

Header.defaultProps = {
  currentUser: null
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);
