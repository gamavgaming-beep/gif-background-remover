const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frames = [];
let width = 0;
let height = 0;

upload.onchange = function(e){

const file = e.target.files[0];
const reader = new FileReader();

reader.onload = function(){

const gif = gifuct.parseGIF(reader.result);
frames = gifuct.decompressFrames(gif,true);

width = frames[0].dims.width;
height = frames[0].dims.height;

canvas.width = width;
canvas.height = height;

drawFrame(0);

};

reader.readAsArrayBuffer(file);

};

function drawFrame(i){

const frame = frames[i];

const imageData = ctx.createImageData(frame.dims.width,frame.dims.height);

imageData.data.set(frame.patch);

ctx.putImageData(imageData,0,0);

}

document.getElementById("remove").onclick = function(){

frames.forEach(frame=>{

let data = frame.patch;

for(let i=0;i<data.length;i+=4){

let r=data[i];
let g=data[i+1];
let b=data[i+2];

if(r>240 && g>240 && b>240){

data[i+3]=0;

}

}

});

drawFrame(0);

}

document.getElementById("download").onclick = function(){

const gif = new GIF({
workers:2,
quality:10,
width:width,
height:height
});

frames.forEach(frame=>{

const imageData = new ImageData(frame.patch,width,height);
ctx.putImageData(imageData,0,0);

gif.addFrame(canvas,{delay:200});

});

gif.on("finished",function(blob){

const link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="edited.gif";
link.click();

});

gif.render();

}
