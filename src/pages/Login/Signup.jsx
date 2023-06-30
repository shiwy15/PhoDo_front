import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Signupbox from "../../components/Login/Signupbox";

function Signup() {
    return (
        <Container fluid className="project-section h-screen">
            <Signupbox/>
        </Container>
    )
}
export default Signup;