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
    saveImage() {
        // Funcao pra salvar view da camera
        var canvas = document.createElement("canvas");
        var img = document.getElementById("mjpeg");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        window.open(canvas.toDataURL("image/png"));

    }
    render() {
        return ( 
            <div className="card text-white bg-secondary m-2" >
                <div className="card-header">Camera</div>
                <div id="mjpeg"> </div>
                <button className="btn btn-primary" onClick={this.saveImage}>Salvar imagem</button>
            </div>
        );
    }
}

export default Camera;