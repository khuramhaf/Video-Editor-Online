

function biquadpreview(){
    clearInterval(intervalid);
    clearInterval(intervalid12);
    var start = parseFloat(document.getElementById("start").value);
    var end = parseFloat(document.getElementById("end").value);
    var startgain = parseFloat(document.getElementById("frequency").value)
    var gainreach = parseFloat(document.getElementById("reach").value)
   var gainselect = document.getElementById("freqselect").value; 
   var qvalue = parseFloat(document.getElementById("qvalue").value);
   var gain1 = parseFloat(document.getElementById("gain").value)
   var typeselect = document.getElementById("type").value


time = parseInt(start);




  



var final = end - start;

if (sourcecheck === null){

    
    if(source){
        source.stop();
    }

    
     if(source1){
        source1.stop();
    }

    else{

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

else if (isNaN(startgain)){

    
}

else{




    const offlineCtx = new AudioContext();
   
var array1 = new Float32Array(end*bufferarray.sampleRate -start*bufferarray.sampleRate)



bufferarray.copyFromChannel(array1, 0, start*bufferarray.sampleRate)

var sourcebuffer = offlineCtx.createBuffer(bufferarray.numberOfChannels, array1.length, bufferarray.sampleRate);

var channeldata = sourcebuffer.getChannelData(0)

channeldata.set(array1)

source1 = offlineCtx.createBufferSource();
var gain = offlineCtx.createBiquadFilter();

if(typeselect === "low pass"){

    gain.type = 'lowpass'
}

else if (typeselect === "high pass"){

    gain.type = 'highpass'
}

else if(typeselect === "band pass"){

    gain.type = 'bandpass'
}

else if (typeselect === "low shelf"){
    gain.type = 'lowshelf'
    }
    
    else if (typeselect === "high shelf"){
        gain.type = 'highshelf'
        }
    
        else if (typeselect === "peaking"){
            gain.type = 'peaking'
            }
    
    
            else if (typeselect === "notch"){
                gain.type = 'notch'
                }
    
    else {
        gain.type = 'allpass'
    
    }
if(gainselect ==='set value at time'){

    if (isNaN(startgain)){
       

    }
    else{

    gain.frequency.setValueAtTime(startgain, 0) 

    if (isNaN(qvalue)){

    }
else {
    gain.Q.value = qvalue;
    
}

if(isNaN(gain1)){

}
else {

    gain.gain.value=gain1;
   
}
    source1.buffer = sourcebuffer;
source1.connect(gain)
gain.connect(offlineCtx.destination)
source1.start(0)
}
}

if(gainselect ==='linear ramp'){

    if(isNaN(startgain)||isNaN(gainreach)){

    }
else{
    gain.frequency.setValueAtTime(startgain, 0) 
    gain.frequency.linearRampToValueAtTime(gainreach, array1.length/bufferarray.sampleRate)
    if (isNaN(qvalue)){

    }
else {
    gain.Q.value = qvalue;
}

if(isNaN(gain1)){

}
else {

    gain.gain.value=gain1;
}
    source1.buffer = sourcebuffer;
    source1.connect(gain)
    gain.connect(offlineCtx.destination)
    source1.start(0)

}
}

if(gainselect ==='exponential ramp'){

    if(isNaN(startgain) || isNaN(gainreach) || gainreach<=0){
       
    
    }

    else{

    gain.frequency.setValueAtTime(startgain, 0) 
    gain.frequency.exponentialRampToValueAtTime(gainreach, array1.length/bufferarray.sampleRate)
    if (isNaN(qvalue)){

    }
else {
    gain.Q.value = qvalue;
}

if(isNaN(gain1)){

}
else {

    gain.gain.value=gain1;
}
    source1.buffer = sourcebuffer;
source1.connect(gain)
gain.connect(offlineCtx.destination)
source1.start(0)
}
}





}}