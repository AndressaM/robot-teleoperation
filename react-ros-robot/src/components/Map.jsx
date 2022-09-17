import React, {Component} from "react";
import Config from "../scripts/config";

class Map extends Component {

    state = {
        ros:null,

    };

    constructor(){
        super();
        this.view_map = this.view_map.bind(this);
    };

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

    componentDidMount(){
        this.init_connection();
        this.view_map();
    }

    view_map(){
        var viewer = new window.ROS2D.Viewer({
            divID : "nav",
            width: 640,
            height: 465,
        });

        var nav = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer : viewer,
            severName : "/move_base",
            withOrientation: true,
        });
    }

    render(){
        return(
        <div>
            <div id="nav">Viewer</div>
        </div>);
    }
}

export default Map;