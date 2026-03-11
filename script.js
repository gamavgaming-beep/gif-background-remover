const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.addEventListener("change", function(e){

const file = e.target.files[0];

const url = URL.createObjectURL(file);

img.onload = function(){

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

};

img.src = url;

});

document.getElementById("remove").onclick = function(){

const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
const data = imageData.data;

for(let i=0;i<data.length;i+=4){

if(data[i]>240 && data[i+1]>240 && data[i+2]>240){
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
