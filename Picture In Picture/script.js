const videoElement=document.getElementById('video');
const button=document.getElementById('button');

//Prompt to select media stream, pass to video element, then play

async function selectMediaStream(){
    try{
        const mediaStream=await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject=mediaStream;
        videoElement.onloadedmetadata=()=>{
            videoElement.play();
        }
    }catch(error){
        //Catch Error Here
        
    }
}
button.addEventListener('click',async()=>{
    //Disable the button
    button.disable=true;
    //Start Pictur in Picture
    await videoElement.requestPictureInPicture();
    //Reset Button
    button.disable=false;
});

//On Load
selectMediaStream();