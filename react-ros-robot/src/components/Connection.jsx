import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Config from "../scripts/config";


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
        // console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established");
            this.setState({ connected: true });
        });

        this.state.ros.on("close", () => {
            this.setState({ connected: false });
            setTimeout(() => {
                try {
                    console.log(Config.Config.ROSBRIDGE_SERVER_IP)
                    this.state.ros.connect(
                        "ws://" +
                        Config.ROSBRIDGE_SERVER_IP +
                        ":" +
                        Config.ROSBRIDGE_SERVER_PORT+
                        ""
                    );
                } catch (error) {
                    console.log("Connection problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT+
                ""
            );
        } catch (e) {
            console.log(e);
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