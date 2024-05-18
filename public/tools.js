let toolsCon = document.querySelector(".tools-cont");
let optionCont = document.querySelector(".option-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let upload = document.querySelector(".upload");
let sticky = document.querySelector(".sticky-note");

let toolsContFlag = true;
let pencilFlag = false;
let eraserFlag = false;

function openTools() {
  let iconElement = optionCont.children[0];
  iconElement.classList.remove("fa-times");
  iconElement.classList.add("fa-bars");

  toolsCon.style.display = "flex";
}

function closeTools() {
  let iconElement = optionCont.children[0];
  iconElement.classList.remove("fa-bars");
  iconElement.classList.add("fa-times");

  toolsCon.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", () => {
    stickyCont.remove();
  });

  minimize.addEventListener("click", () => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") {
      noteCont.style.display = "block";
    } else {
      noteCont.style.display = "none";
    }
  });
}

function createSticky(stickyTemplate) {
  const stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplate;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

optionCont.addEventListener("click", () => {
  // true -> tools show, false -> hide tools
  toolsContFlag = !toolsContFlag;

  toolsContFlag ? openTools() : closeTools();
});

pencil.addEventListener("click", () => {
  // true -> show pencil tool, false -> hide pencil tool
  pencilFlag = !pencilFlag;
  eraserFlag = false;

  if (pencilFlag) {
    pencilToolCont.style.display = "block";
    eraserToolCont.style.display = "none";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", () => {
  eraserFlag = !eraserFlag;
  pencilFlag = false;

  if (eraserFlag) {
    eraserToolCont.style.display = "block";
    pencilToolCont.style.display = "none";
  } else {
    eraserToolCont.style.display = "none";
  }
});

sticky.addEventListener("click", () => {
  const stickyTemplate = `<div class="header-cont">
                            <div class="minimize"></div>
                            <div class="remove"></div>
                          </div>
                          <div class="note-cont">
                            <textarea  spellcheck="false"></textarea>
                          </div>`;

  createSticky(stickyTemplate);
});

upload.addEventListener("click", (e) => {
  // Open File explorer

  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    const stickyTemplate = `<div class="header-cont">
                              <div class="minimize"></div>
                              <div class="remove"></div>
                            </div>
                            <div class="note-cont">
                              <img src="${url}"/>
                            </div>`;

    createSticky(stickyTemplate);
  });
});
