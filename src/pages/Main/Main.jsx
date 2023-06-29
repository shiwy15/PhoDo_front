import React, { useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import homeLogo from "../../Assets/home-main.svg";
import Type from "../../components/Main/Type";
import Type2 from "../../components/Main/Type2";

//component
import TutoFlow from '../../components/Main/TutoFlow';

export const MainPage =() => {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Photo 업무를 함께 DO!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  📸
                </span>
              </h1>

              <h1 className="heading-name">
                
                <strong className="main-name"> 업무 현황을 한눈에!</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
                <Type2 />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
        <Container className="home-content">
          <TutoFlow />
        </Container>
    </section>
  )
}
