const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('controls__color');
const range = document.getElementById('jsRange');
const btnMode = document.getElementById('jsMode');
const btnSave = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
let painting = false;
let filling = false;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(e) {
  // clientX, Y : 윈도우 전체의 범위 내에서 마우스 위치값을 나타냄.
  // 캔버스 내에서의 좌표값만 가져오면 된다. => offset X, Y
  const coords = {
    x: e.offsetX,
    y: e.offsetY
  }
  if (!painting) {
    // path is a line. / painiting = false, path 는 항상 만들고 있음.
    // console.log('creating path in : ', coords.x, coords.y);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  } else {
    // 클릭(mousedown)하면서 움직이는 내내 발생한다.
    // 시작점을 계속 바꿔줘야 해서 closePath() 를 하지 않음.
    // console.log('creating line in : ', coords.x, coords.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    btnMode.innerText = 'Fill'
  } else {
    filling = true;
    btnMode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleContextMenu(e) {
  // console.log(e);
  // canvas 는 pixel 을 다루는 거라서 이미 image 저장or복사 기능이 가능하다.
  // context menu 막기 (마우스 우클릭 방지)
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[🎉]';
  link.click();
}

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('contextmenu', handleContextMenu)

// Array.from() : object 로부터 array 생성함
// console.log(Array.from(colors));
Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);

range.addEventListener('input', handleRangeChange)
btnMode.addEventListener('click', handleModeClick);
btnSave.addEventListener('click', handleSaveClick);

