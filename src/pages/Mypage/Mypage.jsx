import * as React from 'react';
import Container from "react-bootstrap/Container";

// components
import SidebarL from "../../components/mypage/SidebarL"
import GalleryArea2 from '../../components/mypage/GalleryArea2';
import ImgFileInput from '../../components/mypage/ImgFileInput';
import DetailShow from "../../components/mypage/DetailShow"

const Mypage = () =>{
  return (
    <Container fluid className="project-section">

  {/* <div className="fixed w-60 left-0"> 
  < SidebarL /> 
  </div> */}
  {/* <div className="fixed flex flex-wrap justify-center right-0 w-96 h-screen  bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]">
    <ImgFileInput />
    <div className="self-center w-4/5 h-0.5 bg-gray-300 my-2"></div> 
    <DetailShow />
  </div> */}
  <GalleryArea2 />
    </Container>
  );
}

export default Mypage;
