import React from 'react';
import Container from "react-bootstrap/Container";

// components
import SidebarL from "../../components/mypage/SidebarL";
import MyProjectArea  from '../../components/myproject/myprojectArea';

const Myproject = () => {
  return (
    <Container fluid className="project-section ">

        <MyProjectArea />
    </Container>
  );
};

export default Myproject;
