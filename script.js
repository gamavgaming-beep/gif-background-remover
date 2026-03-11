const upload = document.getElementById("upload")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let frames = []
let gif

upload.addEventListener("change", handleGIF)

function handleGIF(e){

const file = e.target.files[0]

const reader = new FileReader()

reader.onload = function(){

const gif = gifuct.parseGIF(reader.result)

frames = gifuct.decompressFrames(gif,true)

drawFrame(0)

}

reader.readAsArrayBuffer(file)

}

function drawFrame(i){

const frame = frames[i]

canvas.width = frame.dims.width
canvas.height = frame.dims.height

const imageData = ctx.createImageData(frame.dims.width,frame.dims.height)

imageData.data.set(frame.patch)

ctx.putImageData(imageData,0,0)

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
