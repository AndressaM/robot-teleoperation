import React, { Component } from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import { Row, Col, Container, Button } from "react-bootstrap"
import Camera from "./Camera";

class Direct extends Component {
    state = {

    };

    render() {
        return (
            <div>
                <Container>
                    <h1 className="text-center mt-3">Direct control</h1>
                </Container>

                <Row>
                    <Col>
                        <Connection />
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <RobotState />
                    </Col>
                    <Col  >
                        <Camera />
                    </Col>
                    <Col className="align-self-center">
                        <Teleoperation />
                    </Col>
                </Row>

            </div>
        )
    }
};

export default Direct;