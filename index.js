const backgroundColor = document.getElementById('background-color-picker');
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

textColor.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        drawLine(lastX, lastY, e.offsetX, e.offsetY);
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        drawLine(lastX, lastY, e.touches[0].clientX, e.touches[0].clientY);
        [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

backgroundColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontSize.addEventListener('change', (e) => {
    ctx.lineWidth = parseInt(e.target.value);
});

clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

download.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-board.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrive.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
