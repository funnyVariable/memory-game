import { Fragment } from "react";

export default function Grid() {
  let matrix = Array(6)
    .fill()
    .map(() => Array(6).fill(null));

  let occupiedCells = [];

  function rand(end, start = 0) {
    return Math.floor(Math.random() * end + start);
  }

  function generatePuzzle(matrix) {
    const width = matrix[0].length;
    const height = matrix.length;
    const n = rand(10);

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
      matrix[cell1.y][cell1.x] = <p>{n}</p>;
      matrix[cell2.y][cell2.x] = <p>{n}</p>;
      occupiedCells.push(cell1);
      occupiedCells.push(cell2);
    }
  }

  for (let i = 0; i < 18; i++) {
    generatePuzzle(matrix);
  }

  let markup = matrix.map((ele, indx) => (
    <Fragment key={indx}>
      {ele.map((ele2, indx2) => (
        <Fragment key={indx2}>{ele2}</Fragment>
      ))}
    </Fragment>
  ));

  return <div className="grid">{markup}</div>;
}
