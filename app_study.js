const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const range = document.getElementById('jsRange');
const colorArray = document.getElementsByClassName('controls__color');
const btnModeChange = document.getElementById('btnModeChange');
const btnBrushChange = document.getElementById('btnBrushChange');
const btnClear = document.getElementById('btnClear');
const btnSave = document.getElementById('btnSave');

const INITIAL_COLOR = '#2c2c2c';
let filling = false;
let painting = false;
let brush = false;

canvas.width = canvas.offsetWidth * 2;
canvas.height = canvas.offsetHeight * 2;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = range.value * 2;
ctx.strokeStyle = INITIAL_COLOR;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function getCoords(e) {
  const coords = {
    x: e.offsetX * 2,
    y: e.offsetY * 2
  }

  if (!painting) {
    // painting 이 시작되기 전에 좌표값을 계속 받아오기
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  } else {
    // painting 을 시작하면 lineTo 로 선을 그린다.
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  }
}

function changeColor(e) {
  const target = e.target;
  const bgColor = target.style.backgroundColor;

  for (let i = 0; i < colorArray.length; i++) {
    if (colorArray[i].classList.contains('is-active')) {
      colorArray[i].classList.remove('is-active');
    }
  }

  target.classList.add('is-active');
  ctx.strokeStyle = bgColor;
  ctx.fillStyle = bgColor;
}

function handleContextMenu(e) {
  e.preventDefault();
}

function handleCanvasClick() {
  (filling) ? ctx.fillRect(0, 0, canvas.width, canvas.height) : '';
}

function handleCanvasCursor(e) {
  const pointerImage = './img/cursor.cur';

  (filling)
  ? e.target.style.cursor = `url(${pointerImage}), default`
  : e.target.style.cursor = 'auto';
}

function handleModeChange() {
  if (!filling) {
    filling = true;
    btnModeChange.innerText = 'Paint';
  } else {
    filling = false;
    btnModeChange.innerText = 'Fill';
  }
}

function handleRange(e) {
  const rangeValue = document.querySelector('.controls__range .value');
  const value = e.target.value;
  const max = parseInt(e.target.max);
  const step = parseFloat(e.target.step);
  const progress = parseFloat(value / max) * (step * 1000);

  ctx.lineWidth = value * 2;
  rangeValue.innerText = value;
  rangeValue.style.left = `${progress}%`;
}

function handleBrush() {
  if (!brush) {
    brush = true;
    ctx.lineCap = 'round';
    btnBrushChange.innerText = 'Brush (Smooth)';
  } else {
    brush = false;
    ctx.lineCap = 'butt';
    btnBrushChange.innerText = 'Brush (Default)';
  }
}

function handleClear() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const resizedCanvas = document.createElement("canvas");
  const resizedContext = resizedCanvas.getContext("2d");
  resizedCanvas.width = canvas.offsetWidth;
  resizedCanvas.height = canvas.offsetHeight;
  resizedContext.drawImage(canvas, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
  const myResizedData = resizedCanvas.toDataURL();

  const link = document.createElement('a');
  link.href = myResizedData;
  link.download = "PaintJS[🎉]";
  link.click();
}

canvas.addEventListener('mousemove', getCoords);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('mouseenter', handleCanvasCursor);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('contextmenu', handleContextMenu);
Array.from(colorArray).forEach(item => item.addEventListener('click', changeColor));
btnModeChange.addEventListener('click', handleModeChange);
range.addEventListener('input', handleRange);
btnBrushChange.addEventListener('click', handleBrush);
btnClear.addEventListener('click', handleClear);
btnSave.addEventListener('click', saveCanvas);
