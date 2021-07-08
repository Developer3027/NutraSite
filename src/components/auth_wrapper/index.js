import React from 'react';
import './styles.scss';

const AuthWrapper = ({ headline, children }) => {
  return (
    <div className='authwrap'>
      <div className='authwrap__wrapper'>
        {headline && <h2>{headline}</h2>}

        <div className='authwrap__children'>{children && children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
