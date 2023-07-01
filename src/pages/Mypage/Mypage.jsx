import * as React from 'react';
import Container from "react-bootstrap/Container";

// components
import SidebarL from "../../components/mypage/SidebarL"
import GalleryArea2 from '../../components/mypage/GalleryArea2';
import ImgFileInput from '../../components/form/ImgFileInput';
import DetailShow from "../../components/mypage/DetailShow"
import NavBar from '../../components/form/Navbar';

const Mypage = () =>{
  return (
    <>
    <NavBar/>
    <Container fluid className="project-section ">
      <GalleryArea2/>
    </Container>
    </>
  );
}

export default Mypage;
