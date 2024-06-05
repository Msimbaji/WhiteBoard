const backgroundColor =document.getElementById('background-color-picker');
const textColor = document.getElementById('text-color');
const clear = document.getElementById('clear');
const download = document.getElementById('download');
const retrive = document.getElementById('retrive');
const canvas = document.getElementById('myCanvas');
const fontSize = document.getElementById('font-weight');
const ctx = canvas.getContext('2d')

let isDrawing = false;
let lastX = 0;
let lastY = 0;


textColor.addEventListener('change',(e)=>
{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})
canvas.addEventListener('mousedown',(e)=>
{
    isDrawing = true
    lastX = e.offsetX;
    lastY = e.offsetY;
})
canvas.addEventListener('touchstart',(e)=>{
    isDrawing = true
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    console.log('Touch start:', lastX, lastY);
})
canvas.addEventListener('mousemove',(e)=>
{
    if(isDrawing)
    {
        ctx.beginPath();
        ctx.moveTo(lastX,lastY)
        ctx.lineTo(e.offsetX,e.offsetY)
        ctx.stroke()
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
})
canvas.addEventListener('touchmove',(e)=>
    {
        if(isDrawing)
        {
            ctx.beginPath();
            ctx.moveTo(lastX,lastY)
            ctx.lineTo(e.touches[0].clientX,e.touches[0].clientY)
            ctx.stroke()
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            console.log('Touch move:', lastX, lastY);
        }
    })

canvas.addEventListener('mouseup',(e)=>
{
    isDrawing = false;
})
canvas.addEventListener('touchcancel',(e)=>
    {
        isDrawing = false;
        console.log('Touch end');
    })

backgroundColor.addEventListener('change',(e)=>
{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,1000,500)
})
fontSize.addEventListener('change',(e)=>
{
   ctx.lineWidth = parseInt(e.target.value);
})
clear.addEventListener('click',()=>
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})
download.addEventListener('click',()=>
{
    localStorage.setItem('canvasContents',canvas.toDataURL())
    let link = document.createElement('a');
    link.download = 'my-board.png'
    link.href = canvas.toDataURL()
    link.click();
})
retrive.addEventListener('click',()=>
{
    let savedCanvas = localStorage.getItem('canvasContents')

    if(savedCanvas)
    {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})
