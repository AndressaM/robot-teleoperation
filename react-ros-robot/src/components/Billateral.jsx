import React, { Component } from "react";
import Connection from "./Connection";
// import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import { Row, Col, Container, Button } from "react-bootstrap"
import Map from "./Map";
import Camera from "./Camera";

class Billateral extends Component {
    state = {

    };

    render() {
        return (
            <div>
                <Container>
                    <h1 className="text-center mt-3">Shared Control</h1>
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
                </Row>
                <Container>
                    <Row>
                        <Col>
                            <Camera/>
                        </Col>
                        <Col>
                            <Map/>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
};

export default Billateral;