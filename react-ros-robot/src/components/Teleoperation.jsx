import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config"

class Teleoperation extends Component {
    state = { ros : null };
    
    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    
    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        
        try {
            this.state.ros.connect(
                "ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + ""
            );
        } catch (error) {
            console.log(
                "ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + ""
            );
            console.log('cannot connect to the WS robot');
        }
    }

    handleMove(event){
        console.log("hanlde move");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist",
        });
        var twist = new window.ROSLIB.Message({
            linear:{
                x:event.y / 50,
                y:0,
                z:0,
            },
            angular: {
                x:0,
                y:0,
                z:-event.x/50,
            },
        });
        cmd_vel.publish(twist);


    }
    handleStop(event){
        console.log("hanlde stop");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist",
        });
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
            <div>
                <Joystick  
                    size={150} 
                    sticky={true} 
                    baseColor="#EEEEEE" 
                    stickColor="#BBBBBB" 
                    move={this.handleMove} 
                    stop={this.handleStop}
                ></Joystick>
            </div>
        );
    }
}

export default Teleoperation;