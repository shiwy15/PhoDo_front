import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import TutorialFlow from './TutorialFlow';
import CategoryTuto from './CategoryTuto';


function TutoFlow() {
  return (
    <Container fluid className="home-about-section">
      <Container>
        <Row>
            <Col className="home-about-description mx-2">
            <Card className="tuto-card-view h-96">
                <Card.Body >
                    <Card.Title>업무흐름을 만들어보세요!</Card.Title>
                    <TutorialFlow/>
                </Card.Body>
            </Card>
            </Col>
            <Col  className="home-about-description mx-2">
            <Card className="tuto-card-view h-96">
                <Card.Body>
                    <Card.Title>카테고리로 정리해보세요!</Card.Title>
                    <CategoryTuto />
                </Card.Body>
            </Card>
            </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default TutoFlow;
