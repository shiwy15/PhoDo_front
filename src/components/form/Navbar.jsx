import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {request } from "./../../utils/axios-utils"

import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlinePartition,
  AiOutlineExport
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

import { useUserStore } from "../store";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  const userName  = useUserStore(state => state.userName)

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", scrollHandler);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);




  return (
    <Navbar
      expanded={expand}
      fixed="top"
    >
      <Container >
        <Navbar.Brand href="/main" className="d-flex text-white">
          <h2>PhoDo</h2>
        </Navbar.Brand>

          <Navbar.Text className="ml-auto text-white">
            {userName? ( <strong>{userName}</strong>) : ''}
          </Navbar.Text>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/main" onClick={() => updateExpanded(false)}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>

                <AiOutlineHome style={{ marginBottom: "2px", marginRight: "2px" }} /> Home
                  </span>

              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/mypage"
                onClick={() => updateExpanded(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>

                <AiOutlineUser style={{ marginBottom: "2px", marginRight: "2px" }} /> Gallery
                </span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/myproject"
                onClick={() => updateExpanded(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>

                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px", marginRight: "2px" }}
                />{" "}
                Myproject
                </span>
              </Nav.Link>
            </Nav.Item>

            {/* <Nav.Item>
              <Nav.Link
                as={Link}
                to="/modal"
                onClick={() => updateExpanded(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>

                <AiOutlinePartition style={{ marginBottom: "2px", marginRight: "2px" }} /> FlowChart
              </span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/main"
                onClick={() => updateExpanded(false)}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                <CgFileDocument style={{ marginBottom: "2px", marginRight: "2px" }} /> Report
                </span>
              </Nav.Link>
            </Nav.Item> */}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Login"
                onClick={async () => {
                  updateExpanded(false);
                  try {
                      const response = await request({
                          method: 'get',
                          url: '/logout',
                      });
                      console.log(response);
                      // handle response here
                  } catch (error) {
                      console.error('There was an error!', error);
                      // handle error here
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                <AiOutlineExport style={{ marginBottom: "2px", marginRight: "2px" }} /> Logout
                </span>
              </Nav.Link>
            </Nav.Item>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

