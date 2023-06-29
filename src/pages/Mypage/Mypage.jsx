import * as React from 'react';

// components
import SidebarL from "../../components/mypage/SidebarL"
import GalleryArea from '../../components/mypage/GalleryArea';
import ImgFileInput from '../../components/mypage/ImgFileInput';
import DetailShow from "../../components/mypage/DetailShow"

const Mypage = () =>{
  return (
<div className="Mypage">
  <div className="fixed w-60 left-0"> < SidebarL /> </div>
  <div className="fixed flex flex-wrap justify-center right-0 w-96 h-screen  bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800">
    <ImgFileInput />
    <div className="self-center w-4/5 h-0.5 bg-gray-300 my-2"></div> 
    <DetailShow />
  </div>
  <div className="ml-60 mt-16 mr-96 px-2" sx={{height:"calc(100vh-60px)"}}> <GalleryArea /> </div>
</div>
  );
}

export default Mypage;
