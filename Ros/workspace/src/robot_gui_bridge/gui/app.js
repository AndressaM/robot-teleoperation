'use strict';
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

ros.on('connection', function() {
document.getElementById("status").innerHTML = "Connected";
console.log('set camera method');
    this.cameraViewer = new MJPEGCANVAS.Viewer({
        divID: 'mjpeg',
        host: '0.0.0.0',
        width: 640,
        height: 480,
        topic: '/camera/rgb/image_raw',
        port: 8080,
    });
});

ros.on('error', function(error) {
document.getElementById("status").innerHTML = "Error";
});

ros.on('close', function() {
document.getElementById("status").innerHTML = "Closed";
});
// TODO COMO CRIAR FUNÇÕES
// var setCamera: function() {
//     console.log('set camera method')
//     this.cameraViewer = new MJPEGCANVAS.Viewer({
//         divID: 'mjpeg',
//         host: '0.0.0.0',
//         width: 640,
//         height: 480,
//         topic: '/camera/rgb/image_raw',
//         port: 8080,
//     })
// };
function printando(){
    document.getElementById("printe").innerHTML = "teste";
}
createJoystick = function () {
    var options = {
      zone: document.getElementById('zone_joystick'),
      threshold: 0.1,
      position: { left: 50 + '%' },
      mode: 'static',
      size: 150,
      color: '#000000',
    };
    manager = nipplejs.create(options);

    linear_speed = 0;
    angular_speed = 0;

    self.manager.on('start', function (event, nipple) {
      console.log("Movement start");
    });

    self.manager.on('move', function (event, nipple) {
      console.log("Moving");
    });

    self.manager.on('end', function () {
      console.log("Movement end");
    });
  }
  window.onload = function () {
    createJoystick();
  }