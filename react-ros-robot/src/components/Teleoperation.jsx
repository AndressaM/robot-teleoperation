import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config"


class Teleoperation extends Component {
    state = { 
        ros : null , 
        ranges : [],
        status: "",
    };
    
    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    componentDidMount(){
        this.getSensor();
        this.isFrontCollision();
        this.isBackCollision();
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

    isFrontCollision(){
        for(let i = 0; i < 89; i++){
            if(this.state.ranges[i] < 0.3 && this.state.ranges[i] != 0){
                return true;
            }
        }
        for(let i = 271; i < 360; i++){
            if(this.state.ranges[i] < 0.3 && this.state.ranges[i] != 0){
                return true;
            }
        }

        return false;
  
         
    }
    isBackCollision(){
        console.log(this.state.ranges.length);
        for(let i = 105; i < 240; i++){
            if(this.state.ranges[i] < 0.3 && this.state.ranges[i] != 0){
                return true;
            }
        }
        return false;

    }

    handleMove(event){
        console.log("hanlde move");
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist",
        });
        this.setState({status:""});
        if (this.isFrontCollision() && event.y > 0){
            console.log("COLLISION");
            this.setState({status:"In collision!"});
            // this.isCollisionStr("Em colisão");
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
        else if(this.isBackCollision() && event.y < 0){
            console.log("COLLISION");
            this.setState({status:"In collision!"});
            // this.isCollisionStr("Em colisão");
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
            console.log(event.y)
            var twist = new window.ROSLIB.Message({
                linear:{
                    x:event.y / 100,
                    y:0,
                    z:0,
                },
                angular: {
                    x:0,
                    y:0,
                    z:-event.x / 100 ,
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
                <h1 className="text-center mt-3">{this.state.status}</h1>

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