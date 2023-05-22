import React, { Component } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import Config from "../scripts/config";


class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = { ip: Config.ROSBRIDGE_SERVER_IP };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.setState.ip = event.target[0].value;
        console.log(event.target[0].value);
        window.location.reload();
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                <Navbar.Brand class="m-3" href="#home">Robot Teleoperation</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {/* <Nav.Link href="/setup">Setup</Nav.Link> */}
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form className="d-flex" onSubmit={this.handleSubmit}>
                <Form.Control
                    type="search"
                    placeholder=''
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success" type="submit">Connect</Button>
                </Form>
                {/* <form class="d-inline-flex">
                    <input class="form-control me-sm-2" type="text" placeholder="ROS MASTER IP"></input>
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Connect</button>
                </form> */}
                </Container>
            </Navbar>
        );
    }
}
export default Header;