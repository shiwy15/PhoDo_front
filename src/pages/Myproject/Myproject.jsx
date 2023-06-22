import * as React from 'react';

//components
import Header from "../../components/mypage/Header"
import Sidebar from "../../components/mypage/SidebarL"
import Projectenterbar from "../../components/myproject/Projectenterbar"

function Myproject() {
  return (
    <div className= "Myproject">
      <div className="fixed top-0 h-16"><Header /></div>
      <div className="fixed w-60 left-0"> < Sidebar /> </div>
      <div className="fixed w-full left-56"><Projectenterbar/> </div>
      
    </div>
  );
}

export default Myproject;