import * as React from 'react';

//components
import Header from "../../components/mypage/Header"
import Sidebar from "../../components/mypage/Sidebar"
import ImgInputContainer from "../../components/mypage/ImgInputArea"
import GalleryBox from '../../components/mypage/GalleryArea';

function Mypage() {
  return (
    <div className="Mypage">
      <ImgInputContainer />
      <GalleryBox />
      <Sidebar />
      <Header />
    </div>
  );
}

export default Mypage;
