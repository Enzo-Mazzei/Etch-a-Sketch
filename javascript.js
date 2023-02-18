const container = document.querySelector(".container");
const options = document.querySelectorAll(".options");
const squareDivsArray = [];
const sizeText = document.querySelector(".sizeText")
const gridSize = document.querySelector(".size");


options.forEach((option) => {
  option.addEventListener("click", (event) => {
    const clickedOption = event.target;
    if (clickedOption.style.backgroundColor === "white") {
      clickedOption.style.backgroundColor = "black";
      clickedOption.style.color = "white";
    } else {
      clickedOption.style.backgroundColor = "white";
      clickedOption.style.color = "black";
    }
  });
});

const dark = document.querySelector(".dark")
const eraser = document.querySelector(".eraser")

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

      dark.addEventListener("click", () => {
        squareDivs.addEventListener("mousedown", (event) => {
          event.preventDefault();
          squareDivs.classList.add("drawing");
        });

        squareDivs.addEventListener("mouseover", (event) => {
          if (event.buttons === 1) {
            squareDivs.classList.add("drawing");
          }
        });
      });

      eraser.addEventListener("click", () => {
        squareDivs.addEventListener("mousedown", (event) => {
          event.preventDefault();
          squareDivs.classList.remove("drawing");
        });

        squareDivs.addEventListener("mouseover", (event) => {
          if (event.buttons === 1) {
            squareDivs.classList.remove("drawing");
          }
        });
      });

      squareDivsArray.push(squareDivs);
    }
  };


/*gridlines and clear buttons */

const gridLines = document.querySelector(".gridLines")
const clear = document.querySelector(".clear")

gridLines.addEventListener("click", () => {
  if (gridLines.textContent === "Hide GridLines") {
    gridLines.textContent = "Show GridLines";
  } else {
    gridLines.textContent = "Hide GridLines";
  }

  squareDivsArray.forEach((squareDiv) => {
    squareDiv.classList.toggle("hide-gridlines");
  });
});

clear.addEventListener("click", () => {
  squareDivsArray.forEach((squareDiv) => {
    squareDiv.classList.remove("drawing");
  });
});
window.onload = () => {
  sizeText.textContent = `${gridSize.value}x${gridSize.value}`
  container.style.setProperty("--grid-size", gridSize.value)
  createGrid(16)
}