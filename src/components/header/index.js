import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/user/user.actions';
import './styles.scss';
import Logo from '../../assets/fbprofile.png';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    console.log('sign out');
    dispatch(signOutUserStart());
  };
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
                <span onClick={() => signOut()}>Log Out</span>
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

export default Header;
