import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Config from "../scripts/config";

class Camera extends Component {
    state = {

    };

    componentDidMount(){
        this.renderCamera();
    }

    renderCamera(){
        var viewer = new window.MJPEGCANVAS.Viewer({
            divID : 'mjpeg',
            host : Config.ROSBRIDGE_SERVER_IP,
            width : 640,
            height : 480,
            // topic : '/raspicam_node/image',
            topic: '/camera/rgb/image_raw',
            interval : 200
          });
    }
    render() {
        return ( 
            <div class="card text-white bg-secondary m-2" >
                <div class="card-header">Camera</div>
                <div id="mjpeg"> </div>
            </div>
        );
    }
}

export default Camera;