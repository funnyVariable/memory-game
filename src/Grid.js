import { img } from "./img";
import questionMark from "./img/questionMark.svg";

export default function Grid() {
  let matrix = Array(6)
    .fill()
    .map(() => Array(6).fill(null));

  let occupiedCells = [];

  function rand(end, start = 0) {
    return Math.floor(Math.random() * end + start);
  }

  function generatePuzzle(matrix, id) {
    const width = matrix[0].length;
    const height = matrix.length;
    const n = rand(28);

    const cell1 = { x: rand(width), y: rand(height) };
    const cell2 = { x: rand(width), y: rand(height) };

    const isCellOccupied =
      occupiedCells.some((elem) => {
        return JSON.stringify(cell1) === JSON.stringify(elem);
      }) ||
      occupiedCells.some((elem) => {
        return JSON.stringify(cell2) === JSON.stringify(elem);
      }) ||
      (occupiedCells.some((elem) => {
        return JSON.stringify(cell1) === JSON.stringify(elem);
      }) &&
        occupiedCells.some((elem) => {
          return JSON.stringify(cell2) === JSON.stringify(elem);
        }));

    if ((cell1.x === cell2.x && cell1.y === cell2.y) || isCellOccupied)
      generatePuzzle(matrix);
    else {
      matrix[cell1.y][cell1.x] = img[n];
      matrix[cell2.y][cell2.x] = img[n];
      occupiedCells.push(cell1);
      occupiedCells.push(cell2);
    }
  }

  for (let i = 0; i < 18; i++) {
    generatePuzzle(matrix, i);
  }

  let counter = 0;
  let markup = matrix.map((ele) =>
    ele.map((ele2) => {
      counter++;
      let id = counter;
      return (
        <div
          key={counter}
          id={counter}
          onClick={() => {
            const target = document.getElementById(id);
            target.className === "clicked"
              ? target.removeAttribute("class")
              : target.setAttribute("class", "clicked");
          }}
        >
          <span>
            <img src={questionMark} alt="img" />
          </span>
          <img src={ele2} alt="img" />
        </div>
      );
    })
  );

  return <div className="grid">{markup}</div>;
}
