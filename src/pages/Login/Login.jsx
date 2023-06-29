import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Loginbox from "../../components/Login/Loginbox";

function Login() {
    return (
        <Container fluid className="project-section h-screen">
                <Loginbox />
        </Container>
    )
}
export default Login;