let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilWidthEle = document.querySelector(".pencil-width");
let pencilColorEle = document.querySelectorAll(".pencil-color");
let eraserWidthEle = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let mouseDown = false;
let pencilWidth = pencilWidthEle.value;
let pencilColor = "black";
let eraserWidth = eraserWidthEle.value;
let eraserColor = "white";
let selectedOption = "pencil";
let track = -1;
let undoRedoTracker = [];

let ctx = canvas.getContext("2d");
ctx.lineWidth = pencilWidth;
ctx.strokeStyle = pencilColor;

function beginPath(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function drawStroke(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

function undoRedoCanvas(track) {
  let url = undoRedoTracker[track];
  let img = new Image(); // new image reference element
  img.src = url;
  img.onload = (e) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
  };
}

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;

  if (selectedOption) {
    ctx.beginPath(e.clientX, e.clientY);
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown && selectedOption) {
    drawStroke(e.clientX, e.clientY);
  }
});

canvas.addEventListener("mouseup", () => {
  mouseDown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

pencil.addEventListener("click", () => {
  selectedOption = "pencil";
  pencil.style.borderBottom = "thick solid #0000FF";
  pencil.style.paddingBottom = "0.2rem";
  eraser.style.borderBottom = "none";
  eraser.style.paddingBottom = "0";

  ctx.lineWidth = pencilWidth;
  ctx.strokeStyle = pencilColor;
});

eraser.addEventListener("click", () => {
  selectedOption = "eraser";
  eraser.style.borderBottom = "thick solid #0000FF";
  eraser.style.paddingBottom = "0.2rem";
  pencil.style.borderBottom = "none";
  pencil.style.paddingBottom = "0";

  ctx.lineWidth = eraserWidth;
  ctx.strokeStyle = eraserColor;
});

pencilWidthEle.addEventListener("change", () => {
  pencilWidth = pencilWidthEle.value;
  ctx.lineWidth = pencilWidth;
});

eraserWidthEle.addEventListener("change", () => {
  eraserWidth = eraserWidthEle.value;
  ctx.lineWidth = eraserWidthEle.value;
});

pencilColorEle.forEach((colorEle) => {
  colorEle.addEventListener("click", (e) => {
    const color = colorEle.classList[0];
    pencilColor = color;
    ctx.strokeStyle = pencilColor;
  });
});

download.addEventListener("click", () => {
  let url = canvas.toDataURL("image/png", 1);

  let a = document.createElement("a");
  a.href = url;
  a.download = "board.png";
  a.click();
});

undo.addEventListener("click", () => {
  if (track > 0) {
    track--;
    undoRedoCanvas(track);
  }
});

redo.addEventListener("click", () => {
  if (track < undoRedoTracker.length - 1) {
    track++;
    undoRedoCanvas(track);
  }
});
