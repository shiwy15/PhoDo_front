import React from 'react';
import Container from "react-bootstrap/Container";

// components
import MyProjectArea2  from '../../components/myproject/MyprojectArea2';
import NavBar from '../../components/form/Navbar';

const Myproject = () => {
  return (
    <>
    <NavBar/>
    <Container fluid className="project-section">
        <MyProjectArea2 />
    </Container>
    </>
  );
};

export default Myproject;
