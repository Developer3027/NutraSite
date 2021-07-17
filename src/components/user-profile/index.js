import React from 'react';
import './styles.scss';
import { FaUserAlt } from 'react-icons/fa';

const UserProfile = (props) => {
  const { currentUser } = props;
  const { displayName } = currentUser;

  return (
    <div className='userProfile'>
      <ul>
        <li>
          <div className='userProfile-img'>
            <FaUserAlt />
          </div>
        </li>
        <li>
          <span className='userProfile-displayName'>
            {displayName && displayName}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
