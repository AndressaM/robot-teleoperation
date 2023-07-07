import React, { Component } from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import { Row, Col, Container, Button } from "react-bootstrap"
import Setup from "./Setup";
class Home extends Component {
    state = {

    };

    render() {
        return (
            <div>
                {/* <Camera/> */}
                <Container>
                    <h1 className="text-center mt-3">Robot Control Page</h1>
                    {/* <div className="text-center">
                        <h5 className="text-center mt-3">Enter the IP Address of the Robot</h5>
                        <Setup/>
                    </div> */}
                    <h5 className="text-center mt-3">Choose the Teleoperation mode</h5>
                    <section className="p-4 text-center w-100">
                        <div className="btn-group-vertical"role="group" >
                            <a className="btn btn-primary"  href="/direct" role="button">Direct Teleoperation</a>
                            <a className="btn btn-primary" href="/billateral" role="button">Shared Teleoperation</a>
                            {/* <a className="btn btn-primary" href="/explore" role="button">Inspection</a> */}
                            {/* <a class="btn btn-primary" href="/explore" role="button">Explore</a> */}
                        </div>
                    </section>
                </Container>
                  
            </div>
        );
    }
}

export default Home;

