const container = document.querySelector(".container");
const options = document.querySelectorAll(".options");
const squareDivsArray = [];
const sizeText = document.querySelector(".sizeText")
const gridSize = document.querySelector(".size");
const rainbow = document.querySelector(".rainbow")
const shading = document.querySelector(".shading")
const eraser = document.querySelector(".eraser")
const color = document.querySelector(".color")
const colorButton = document.querySelector(".color-value")

function setButtonsToggles(newMode) {
  if (newMode === 'rainbow') {
    rainbow.classList.add('active');
    colorButton.classList.remove('active');
    eraser.classList.remove('active');
    shading.classList.remove('active');
  } else if (newMode === 'color') {
    rainbow.classList.remove('active');
    colorButton.classList.add('active');
    eraser.classList.remove('active');
    shading.classList.remove('active');
  } else if (newMode === 'eraser') {
    rainbow.classList.remove('active');
    colorButton.classList.remove('active');
    eraser.classList.add('active');
    shading.classList.remove('active');
  } else if (newMode === 'shading') {
    rainbow.classList.remove('active');
    colorButton.classList.remove('active');
    eraser.classList.remove('active');
    shading.classList.add('active');
  }
}

gridSize.addEventListener("input", () => {
  sizeText.textContent = `${gridSize.value}x${gridSize.value}`;
  container.style.setProperty("--grid-size", gridSize.value);
  container.innerHTML = ""; 
  createGrid(gridSize.value)})

/*grid overall, drawing, eraser*/

function createGrid(size){
  for (let i = 0; i < size*size; i++) {
      const squareDivs = document.createElement("div");
      squareDivs.classList.add("squareDivs");
      if (gridLines.textContent === "Show GridLines"){
        squareDivs.classList.add("hide-gridlines")
      }
      container.appendChild(squareDivs);
      color.addEventListener('input', (event) => {
        setButtonsToggles('color')
        setDrawingBehavior(color);
      });
      
      colorButton.addEventListener("click", () => {
        setButtonsToggles('color')
        setDrawingBehavior(color);
      })
      rainbow.addEventListener("click", () => {
        setButtonsToggles('rainbow')
        setDrawingBehavior(rainbow);
      })
      shading.addEventListener("click", () => {
        setButtonsToggles('shading')
        setDrawingBehavior(shading);
      })
      eraser.addEventListener("click", () => {
        setButtonsToggles('eraser')
        setDrawingBehavior(eraser);
      })
      function shadeRGBColor(color, percent) {
        var f = color.split(",");
        var t = percent < 0 ? 0 : 255;
        var p = Math.abs(percent) / 100;
        var R = parseInt(f[0].slice(4));
        var G = parseInt(f[1]);
        var B = parseInt(f[2]);
        R = Math.round((t - R) * p) + R;
        G = Math.round((t - G) * p) + G;
        B = Math.round((t - B) * p) + B;
        R = Math.max(0, Math.min(255, R));
        G = Math.max(0, Math.min(255, G));
        B = Math.max(0, Math.min(255, B));
        return "rgb(" + R + "," + G + "," + B + ")";
      }

      function setDrawingBehavior(drawingType) {
        let currentColor;
        if (squareDivs.style.backgroundColor === "white" || squareDivs.style.backgroundColor === "") {
          currentColor = "rgb(255,255,255)"
        }
        else {
          currentColor = squareDivs.style.backgroundColor
        }
        squareDivs.addEventListener("mousedown", (event) => {
          event.preventDefault();
          switch (drawingType.classList[0]) {
            case "rainbow":
              const randomColor = Math.floor(Math.random() * 16777215).toString(16);
              squareDivs.style.backgroundColor = "#" + randomColor;
              break;
            case "color":
              squareDivs.style.backgroundColor = color.value;
              break;
            case "eraser":
              squareDivs.style.backgroundColor = "white";
              break;
            case "shading":
              const newColor = shadeRGBColor(currentColor, -10);
              currentColor=newColor
              squareDivs.style.backgroundColor = newColor;
              break;
            default:
              squareDivs.style.backgroundColor = "";
              break;
          }
        });
      
        squareDivs.addEventListener("mouseover", (event) => {
          if (event.buttons === 1) {
            switch (drawingType.classList[0]) {
              case "rainbow":
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                squareDivs.style.backgroundColor = "#" + randomColor;
                break;
              case "color":
                squareDivs.style.backgroundColor = color.value;
                break;
              case "eraser":
                squareDivs.style.backgroundColor = "white";
                break;
                case "shading":
                  const newColor = shadeRGBColor(currentColor, -10);
                  currentColor=newColor
                  squareDivs.style.backgroundColor = newColor;
                  break;
              default:
                squareDivs.style.backgroundColor = "";
                break;
            }
          }
        });
      }
      
    squareDivsArray.push(squareDivs);
    setButtonsToggles('color')
    setDrawingBehavior(color);
    }}      
/*gridlines and clear buttons */

const gridLines = document.querySelector(".gridLines")
const clear = document.querySelector(".clear")

gridLines.addEventListener("click", () => {
  if (gridLines.textContent === "Hide GridLines") {
    gridLines.classList.add('active')
    gridLines.textContent = "Show GridLines";
  } else {
    gridLines.classList.remove('active')
    gridLines.textContent = "Hide GridLines";
  }

  squareDivsArray.forEach((squareDiv) => {
    squareDiv.classList.toggle("hide-gridlines");
  });
});

function setButtonsClicks(button) {
  button.classList.add('active');
  setTimeout(function() {
    button.classList.remove('active');
  }, 250);
};
clear.addEventListener("click", () => {
  setButtonsClicks(clear)
  squareDivsArray.forEach((squareDiv) => {
    squareDiv.style.backgroundColor = "white"
  });
});

sizeText.textContent = `${gridSize.value}x${gridSize.value}`
container.style.setProperty("--grid-size", gridSize.value)
createGrid(16)
