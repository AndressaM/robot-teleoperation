import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config"


class Teleoperation extends Component {
    state = { 
        ros : null , 
        ranges : [],
    };
    
    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    componentDidMount(){
        this.getSensor();
        this.isCollision();
    }
    
    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        
        try {
            this.state.ros.connect(
                // "ws://" +  + ":" + Config.ROSBRIDGE_SERVER_PORT + ""
                "ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + ""

            );
            console.log("IP")
            console.log(Config.ROSBRIDGE_SERVER_IP)
        } catch (error) {
            console.log(
                "ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + ""
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
        });
    }

    isCollision(){
        var media = 0;
        for (var i = 0; i < 20; i++) {
            
            media +=this.state.ranges[i]
            // more statements
         }
         console.log(media/20);
         return media/20;
         
         
    }

    handleMove(event){
        console.log("hanlde move");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist",
        });
        if (this.isCollision() < 0.5 && event.y > 0){
            console.log("COLLISION");
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
        }
        else{
            var twist = new window.ROSLIB.Message({
                linear:{
                    x:event.y / 10,
                    y:0,
                    z:0,
                },
                angular: {
                    x:0,
                    y:0,
                    z:-event.x/2,
                },
            });
        }
        
        cmd_vel.publish(twist);
        this.isCollision();


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
            <div className="alig">
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