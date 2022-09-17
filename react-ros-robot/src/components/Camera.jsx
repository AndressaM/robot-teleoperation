import React, { Component } from "react";

class Camera extends Component {
    state = {

    };

    componentDidMount(){
        this.renderCamera();
    }

    renderCamera(){
        var viewer = new window.MJPEGCANVAS.Viewer({
            divID : 'mjpeg',
            host : 'localhost',
            width : 640,
            height : 480,
            topic : '/raspicam_node/image',
            interval : 200
          });
    }
    render() {
        return ( <div id="mjpeg"> </div>);
    }
}

export default Camera;