var frontCamera = false;
var currentStream;

//Define constants
const
    cameraView=document.querySelector("#camera-view"),
    cameraDevice=document.querySelector("#camera-device"),
    photoDisplay=document.querySelector("#photo-display"),
    takePhotoButton=document.querySelector("#take-photo-button"),
    frontCameraButton=document.querySelector("#front-camera-button");

function cameraStart(){
    //Stop the video streaming before access the media device
    if (typeof currentStream !=='undefined'){
        currentStream.getTracks().forEach(track => {
            track.stop();
        });
    }

    //"user" =>front camera
    //"environment" => back camera
    var constraints = {video:{facingMode:(frontCamera?"user":"environment")},audio:false};

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream){
            currentStream=stream;
            cameraDevice.srcObject=stream;
        })
        .catch(function(error){
            console.error("Error happened.",error);
        });
}

takePhotoButton.onclick=function(){
    cameraView.width=cameraDevice.videoWidth;
    cameraView.height=cameraDevice.videoHeight;
    cameraView.getConText("2d").drawImage(cameraDevice,0,0);
    photoDisplay.src=cameraView.toDataURL("image/webp");
    photoDisplay.classList.add("photo-taken");
};

frontCameraButton.onclick=function(){
    frontCamera=!frontCamera;
    if (frontCamera){
        frontCameraButton.textContent="Back Camera";
    }
    else {
        frontCameraButton.textContent="Front Camera";
    }
    cameraStart();
};

//Start the camera and video streaming when the window laods
//1st parameter:Event type
//2nd parameter:Function to be called when the event occurs
window.addEventListener("load",cameraStart);
