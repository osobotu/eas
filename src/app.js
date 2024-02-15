const gridContainer = document.querySelector("div.grid-container");

const DEFAULT_GRID_SIZE = 16;
const gridBoxesCount = new Map();
function addBoxes(n) {
  //   remove all existing children
  const children = document.querySelectorAll(".grid-box");
  gridContainer.replaceChildren();
  //   clear grid map
  gridBoxesCount.clear();

  //  add new children
  for (let i = 0; i < n; i++) {
    let gridBox = document.createElement("div");
    gridBox.className = "grid-box";
    gridBox.id = `grid-box${i + 1}`;
    gridBox.textContent = `${i + 1}`;
    gridContainer.appendChild(gridBox);
  }
}

addBoxes(DEFAULT_GRID_SIZE);

gridContainer.addEventListener("mouseover", function (e) {
  let id = e.target.id;
  if (gridBoxesCount.has(id)) {
    let v = gridBoxesCount.get(id);
    gridBoxesCount.set(id, v + 1);
  } else {
    gridBoxesCount.set(id, 1);
  }
  hover(e.target.id, gridBoxesCount.get(id));
});

function hover(id, count) {
  const box = document.querySelector(`#${id}`);
  let r = 0;
  let g = 0;
  let b = 0;
  let opVal = (count * 10) / 100;
  let op = opVal > 1 ? 1 : opVal;
  let bgColor = `background-color: rgba(${r}, ${g}, ${b}, ${op});`;
  box.style.cssText = bgColor;
}

const promptButton = document.querySelector("#size-prompt");

promptButton.addEventListener("click", function () {
  let n = getGridSize();
  addBoxes(n);
});

function getGridSize() {
  let gridSize = DEFAULT_GRID_SIZE;
  value = prompt("How many squares per row?");
  gridSize = Number(value);
  if (gridSize > 100 || gridSize < 4) {
    alert("Enter a value between 4 and 100");
    gridSize = DEFAULT_GRID_SIZE;
  }
  return gridSize;
}
