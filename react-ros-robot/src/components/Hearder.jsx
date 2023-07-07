import React, { Component} from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import Direct from "./Direct";

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = { ip:'',
        inputValue: '',
    };

    }   

    handleChange = (event) => {
        this.setState({inputValue: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ip: this.state.inputValue,inputValue:''});
    }

    updateState = (event) => {
        this.setState({ip: event.target.value});
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                <Navbar.Brand className="m-3" href="#home">Robot Teleoperation</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {/* <Nav.Link href="/setup">Setup</Nav.Link> */}
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                
                <form className="d-flex"onSubmit={this.handleSubmit}>
                    <input className="form-control me-sm-2" type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="10.0.0.151" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Submit</button>
                </form>
                
                </Container>
            </Navbar>
        );
    }
}
export default Header;