import React, { Component } from "react";
import { Row, Col} from "react-bootstrap";
import Config from "../scripts/config";
import * as Three from "three"

class RobotState extends Component {
    state = {
        ros:null,
        x:0,
        y:0,
        orientation:0,
        linear:0,
        angular:0,
        battery:0,
    };
    constructor(){
        super();
        this.init_connection();
    }

    componentDidMount(){
        this.getRobotState();
    }

    getRobotState(){
        
        var pose_subscriber = new window.ROSLIB.Topic({
            ros:this.state.ros,
            name:"/amcl_pose",
            messageType:"geometry_msgs/PoseWithCovarianceStamped"
        });
        // Callback
        pose_subscriber.subscribe((message)=>{
            this.setState({x:message.pose.pose.position.x.toFixed(2)});
            this.setState({y:message.pose.pose.position.y.toFixed(2)});
            this.setState({orientation: this.getOrientationFromQuaternion(
                message.pose.pose.orientation).toFixed(2),
            });
        });

        var velocity_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name:"/odom",
            messageType: "nav_msgs/Odometry"
        })

        velocity_subscriber.subscribe((message)=>{
            this.setState({linear:message.twist.twist.linear.x.toFixed(2)});
            this.setState({angular:message.twist.twist.angular.z.toFixed(2)});
        });
        
        var battery_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name:"/battery_state",
            messageType: "sensor_msgs/BatteryState"
        })

        battery_subscriber.subscribe((message)=>{
            this.setState({battery:message.percentage.toFixed(2)});
            // this.setState({angular:message.twist.twist.angular.z.toFixed(2)});
        });
    }

    getOrientationFromQuaternion(ros_orientation_quaternion){
        var q = Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w
        );

        var RPY = new Three.Euler().setFromQuaternion(q);

        return RPY["_z"] * (180 / Math.PI);
    }
    

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();

        try {
            this.state.ros.connect(
                "ws://" + Config.ROSBRIDGE_SERVER_IP  + ":" + Config.ROSBRIDGE_SERVER_PORT + ""
            );
        } catch (error) {
            console.log(
                "ws://" + Config.ROSBRIDGE_SERVER_IP  + ":" + Config.ROSBRIDGE_SERVER_PORT + ""
            );
            console.log('cannot connect to the WS robot');
        }
    }

    render() {
        return (
            <div class="card text-white bg-secondary m-3" >
            <div class="card-header">Information</div>
            <div class="card-body">
            <div class="card-body">
                    <Row>
                        <Col>
                            <h4 className="m-3">Position</h4>
                            <p className="m-3">x: {this.state.x}</p>
                            <p className="m-3">y: {this.state.y}</p>
                            <p className="m-3">Orientation: {this.state.orientation}</p>
                        </Col>
                        <Col>
                            <h4 className="m-3">Velocity</h4>
                            <p className="m-3">Linear: {this.state.linear}</p>
                            <p className="m-3">Angular: {this.state.angular}</p>
                        </Col>
                        <Col>
                            <h4 className="m-3">Energy</h4>
                            <p className="m-3">Batery percent: {this.state.battery}</p>
                        </Col>
                    </Row>
                </div>
            </div>
            </div>
            // <div class="card bg-secondary m-3">
            //     <div class="card-header m-3">Informations</div>
            //     <div class="card-body">
            //         <Row>
            //             <Col>
            //                 <h4 className="m-3">Position</h4>
            //                 <p className="m-3">x: {this.state.x}</p>
            //                 <p className="m-3">y: {this.state.y}</p>
            //                 <p className="m-3">Orientation: {this.state.orientation}</p>
            //             </Col>
            //             <Col>
            //                 <h4 className="m-3">Velocity</h4>
            //                 <p className="m-3">Linear: {this.state.linear}</p>
            //                 <p className="m-3">Angular: {this.state.angular}</p>
            //             </Col>
            //             <Col>
            //                 <h4 className="m-3">Energy</h4>
            //                 <p className="m-3">Batery percent: {this.state.battery}</p>
            //             </Col>
            //         </Row>
            //     </div>
            // </div>


        );
    }
}

export default RobotState;