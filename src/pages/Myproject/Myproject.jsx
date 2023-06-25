import React from 'react';

// components
import Header from "../../components/mypage/Header";
import SidebarL from "../../components/mypage/SidebarL";
import MyProjectArea  from '../../components/myproject/myprojectArea';

const Myproject = () => {
  return (
    <div className="Myproject">
      <div className="fixed top-0 left-0 h-16 w-full z-10">
        <Header />
      </div>
      <div className="fixed top-16 left-0 w-60 h-full z-0">
        <SidebarL />
      </div>
      <div className="pl-64 z-15">
        <MyProjectArea />
      </div>
    </div>
  );
};

export default Myproject;
