import React, { Component } from "react";
import { Alert } from "react-bootstrap";


class Connection extends Component {
    state = {
        connected: false,
        ros: null
    };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established");
            this.setState({ connected: true });
        });

        this.state.ros.on("close", () => {
            this.setState({ connected: false });
        });

        try{
            this.state.ros.connect("ws://192.168.0.104:9090");
        } catch (error) {
            console.log("Connection problem");
        }

    }
    render() {
        return (
            <div>
                <Alert className="text-center m-3" variant={this.state.connected ? "success" : "danger"}>
                    {this.state.connected ? "Robot connected" : "Robot disconnected"}</Alert>
            </div>
        );
    }
}

export default Connection;