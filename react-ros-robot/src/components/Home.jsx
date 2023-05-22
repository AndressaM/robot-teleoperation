import React, { Component } from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import { Row, Col, Container, Button } from "react-bootstrap"

class Home extends Component {
    state = {

    };

    render() {
        return (
            <div>
                {/* <Camera/> */}
                <Container>
                    <h1 className="text-center mt-3">Robot Control Page</h1>
                    <h5 className="text-center mt-3">Choose the Teleoperation mode</h5>
                </Container>
                <section class="p-4 text-center w-100">
                    <div class="btn-group-vertical"role="group" >
                        <a class="btn btn-primary"  href="/direct" role="button">Direct Teleoperation</a>
                        <a class="btn btn-primary" href="#" role="button">Shared Teleoperation</a>
                        <a class="btn btn-primary" href="/billateral" role="button">Inspection</a>
                        {/* <a class="btn btn-primary" href="/explore" role="button">Explore</a> */}
                    </div>
                </section>
                


            </div>
        );
    }
}

export default Home;

