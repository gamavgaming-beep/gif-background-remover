const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.addEventListener("change", function(e){

const file = e.target.files[0];

if(!file) return;

const url = URL.createObjectURL(file);

img.onload = function(){

canvas.width = img.width;
canvas.height = img.height;

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

};

img.src = url;

});

document.getElementById("remove").onclick = function(){

const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
const data = imageData.data;

for(let i=0;i<data.length;i+=4){

const r=data[i];
const g=data[i+1];
const b=data[i+2];

if(r>240 && g>240 && b>240){

data[i+3]=0;

}

}

ctx.putImageData(imageData,0,0);

};

document.getElementById("download").onclick = function(){

const link=document.createElement("a");

link.download="result.png";

link.href=canvas.toDataURL();

link.click();

};
