import React from 'react';
import Header from '../components/header';
import SocialBar from '../components/social_bar';
import Footer from '../components/footer';

const MainLayout = (props) => {
  return (
    <div className='fullHeight'>
      <SocialBar />
      <Header {...props} />
      <div className='main'>{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
