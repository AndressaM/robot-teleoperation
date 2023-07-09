import React, { Component } from "react";
import Config from "../scripts/config"
import {Container} from "react-bootstrap"
import Map from "./Map";
import Teleoperation from "./Teleoperation";

class Explore extends Component {
    state = { 
        ros : null,
        range_max : 0,
        ranges : [],
        range_min : 0,
    };
    
    constructor() {
        super();
        this.init_connection();
    }
    
    componentDidMount(){
        this.getSensor();
        // this.moveRobot();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        
        try {
            this.state.ros.connect(
                "ws://" +Config.ROSBRIDGE_SERVER_IP+ ":" + Config.ROSBRIDGE_SERVER_PORT + ""
            );
        } catch (error) {
            console.log(
                "ws://" + Config.ROSBRIDGE_SERVER_IP+ ":" + Config.ROSBRIDGE_SERVER_PORT + ""
            );
            console.log('cannot connect to the WS robot');
        }
    }

    getSensor(){
        var scan_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name:"/scan",
            messageType: "sensor_msgs/LaserScan"
        })
        scan_subscriber.subscribe((message)=>{
            this.setState({ranges:message.ranges});
            this.setState({range_max:message.range_max});
            this.setState({range_min:message.range_min});
        });
    }

    moveRobot(){
        
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist",
        });
        
        console.log() 
        var twist = new window.ROSLIB.Message({
            linear:{
                x:0,
                y:0,
                z:0,
            },
            angular: {
                x:0,
                y:0,
                z:0,
            },
        });

        

        cmd_vel.publish(twist);
    }


    
    render() {
        return (
        <Container>
            <h1 className="text-center mt-3">Exploration Map</h1>
            {/* <h5>Range Max : {this.state.range_max}</h5>
            <h5>Range Min : {this.state.range_min}</h5>
            <h5>Ranges : {this.state.ranges[50]}</h5> */}
            <Map/>
            {/* <Teleoperation/> */}
        </Container>
        );
    }
}

export default Explore;