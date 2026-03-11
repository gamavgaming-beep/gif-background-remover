const upload = document.getElementById("upload")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let img = new Image()

upload.onchange = function(e){

const file = e.target.files[0]

img.src = URL.createObjectURL(file)

img.onload = function(){

canvas.width = img.width
canvas.height = img.height

ctx.drawImage(img,0,0)

}

}

document.getElementById("remove").onclick = function(){

let imageData = ctx.getImageData(0,0,canvas.width,canvas.height)

let data = imageData.data

for(let i=0;i<data.length;i+=4){

let r=data[i]
let g=data[i+1]
let b=data[i+2]

if(r>240 && g>240 && b>240){

data[i+3]=0

}

}

ctx.putImageData(imageData,0,0)

}

document.getElementById("download").onclick = function(){

const gif = new GIF({
workers:2,
quality:10,
workerScript:"gif.worker.js"
})

gif.addFrame(canvas,{delay:200})

gif.on("finished",function(blob){

const link=document.createElement("a")
link.href=URL.createObjectURL(blob)
link.download="transparent.gif"
link.click()

})

gif.render()

}
