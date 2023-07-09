import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Setup from "./Setup";
import Direct from "./Direct";
import Explore from "./Explore";
// import Map from "./Map";
import Billateral from "./Billateral";

class Body extends Component {
    render() {
        return (
            <Container>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/setup" exact element={<Setup/>}/>
                        <Route path="/about" exact element={<About/>}/>
                        <Route path="/direct" exact element={<Direct/>}/>
                        <Route path="/billateral" exact element={<Billateral/>}/>
                        <Route path="/explore" exact element={<Explore/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>);
    }

}
export default Body;