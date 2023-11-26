function play(){

    clearInterval(intervalid);
    
    clearInterval(intervalid12);
    
    var start = parseFloat(document.getElementById("start").value);
var end = parseFloat(document.getElementById("end").value);

time = parseInt(start);

var final = end-start


  



var final = end - start;

if (sourcecheck === null){

    
    if(source){
        source.stop();
    }

    if(source1){
        source1.stop();
    }
}

if (check === null ){

document.getElementById("error").innerHTML = "Please select a file"

}

else if (bufferarray===null){

document.getElementById("error").innerHTML = "No data available"

}

else if (isNaN(start)){
document.getElementById("error").innerHTML = "Starting point is not a number"


}
else if (start >= source.buffer.duration){
document.getElementById("error").innerHTML = "starting point is greater than or equal to source buffer duration"

} 

else if (start < 0 )
{

document.getElementById("error").innerHTML = "Starting Point must be greater than 0"

}
else if (start >= end) {
document.getElementById("error").innerHTML = "Starting Point must be less than Ending Point"

}

else if (isNaN(end)){
document.getElementById("error").innerHTML = "Ending Point is not a number"
} 
else if ( end > source.buffer.duration ){

document.getElementById("error").innerHTML = "Ending point is greater than  duration"

end < 0 }

else if ( end <= start){

document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"

}




    else{
        document.getElementById("timer").innerHTML = time;
        source = audiocontext.createBufferSource();


        const analyser = audiocontext.createAnalyser();
        analyser.fftSize = 2048;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        
        // Connect the source to be analysed
        source.connect(analyser);
         
         source.buffer=bufferarray;
         analyser.connect(audiocontext.destination);
         source.start(0, start, final);
         drawmarker1();
         drawtime();
         document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
     
         if (parseInt(start) != parseInt(end)){
intervalid =   setInterval(()=>{
    
    time++;
    document.getElementById("timer").innerHTML = time;

    if (time === parseInt(end)){
        clearInterval(intervalid);
    }

}, 1000);
    
    }


    function draw() {


        const canvas = document.getElementById("canvas12");
    const canvasCtx = canvas.getContext("2d");
        requestAnimationFrame(draw);
      
        analyser.getByteTimeDomainData(dataArray);
      
        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0, 0, 0)";
      
        canvasCtx.beginPath();
      
        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;
      
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;
      
          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
      
          x += sliceWidth;
        }
      
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      }

draw();



var framestart = parseInt(start*videoinfo.samplerate);


var i = 0;
videointerval = setInterval (()=>{
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
canvas.width = videoinfo.width/2
canvas.height = videoinfo.height/2
    const options = {
        primaries: "bt709",
          transfer:"bt709",
                            matrix:null,
        fullRange: true,
      };
      var colorspace = new VideoColorSpace(options);
    const init = {
        timestamp: i*1000000/30,
        codedWidth: videoinfo.width,
        codedHeight: videoinfo.height,
        format: "NV12",
        duration:1000000/30,
        colorSpace: colorspace,
      };
        var videoframe = new VideoFrame(videodata[framestart], init)
     
    
    
    ctx.drawImage(videoframe, 0, 0, videoinfo.width/2, videoinfo.height/2)
    
    videoframe.close();

    framestart++;
    i++;

    if(framestart === parseInt(end * videoinfo.samplerate)){

        clearInterval(videointerval)
    }

}, 1000/videoinfo.samplerate)



}



     

  }

function drawmarker1(){
    var start = parseFloat(document.getElementById("start").value);
    var end = parseFloat(document.getElementById("end").value);
    
    var final = end-start


var time1=start*20
    var canvas = document.getElementById("canvas11");
    var ctx = canvas.getContext("2d")


   intervalid12 =   setInterval(()=>{

    var newarray = bufferarray.getChannelData(0);
     
       ctx.clearRect(0,0,canvas.width, canvas.height)
       ctx.fillStyle = "black"
       ctx.globalAlpha = 1;
       ctx.beginPath();
       ctx.moveTo(0, canvas.height / 2);
       ctx.lineWidth = 1;
    const topOffset = 10;
    const bottomOffset = 10;
    for (let i = 0; i < newarray.length; i=i+500) {
    const x = i / newarray.length * canvas.width;
    const y = ((newarray[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
    ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = "red"; // Set the fill color
    ctx.globalAlpha = 0.2; 

ctx.fillRect(rectx, 0, rectwidth, 150);
   
        time1=time1+1;
        ctx.globalAlpha = 1;
        ctx.fillStyle="yellow"
       var xvalue = ((time1/source.buffer.duration)*canvas.width)/20
     
        ctx.fillRect(xvalue,0,5, 150)
        if (time1 >= parseInt(end*20)){
            clearInterval(intervalid12);
            time1=start*20;
        }
    
    }, 50);
}


 function drawtime(){

var duration = source.buffer.duration
    var canvas13 = document.getElementById("canvas13");
    var ctx1 = canvas13.getContext("2d");
var scale = duration/20
    var length = (1290/duration)*scale

    ctx1.clearRect(0,0, canvas13.width, canvas13.height)

    ctx1.fillStyle = "black"
    ctx1.globalAlpha = 1;
var x = 0;
    for (i = 1; i<parseInt(source.buffer.duration)/scale; i++){
x = x+length
    ctx1.fillText(parseInt(i*scale), x, 12)
    ctx1.fillText("|", x+38, 12)
}
 }