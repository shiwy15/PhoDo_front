import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Loginbox from "../../components/Login/Loginbox";

function Login() {
    return (
        <Container fluid className="project-section">
                <Loginbox className='b-8' />
        </Container>
    )
}
export default Login;