import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './../user-profile';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const Sidebar = ({ children }) => {
  const { currentUser } = useSelector(mapState);
  const configUserProfile = { currentUser };

  return (
    <div className='sidebar'>
      <UserProfile {...configUserProfile} />
      <div className='sidebar-menu'>{children}</div>
    </div>
  );
};

export default Sidebar;
