import { useEffect, useRef, useState } from "react";
import { img } from "./img";
import questionMark from "./img/questionMark.svg";

export default function Game() {
  const matrix = useRef(
    Array(6)
      .fill()
      .map(() => Array(6).fill(null))
  );

  let occupiedCells = [];

  let guess = [];
  const correctGuesses = useRef(0);
  const correct = useRef(0);
  const [win, setWin] = useState(false);
  const [effect, setEffect] = useState(0);

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

  function guessHandler(id) {
    const target = document.getElementById(id);
    target.className === "clicked"
      ? target.removeAttribute("class")
      : target.setAttribute("class", "clicked");
    guess.push(target);
    if (guess[1]) {
      if (
        guess[0].children[1].src === guess[1].children[1].src &&
        guess[0].id !== guess[1].id
      ) {
        correct.current.setAttribute("class", "correct");
        setTimeout(() => {
          guess[0].setAttribute("class", "hidden");
          guess[1].setAttribute("class", "hidden");
        }, 600);
        correctGuesses.current === 17 ? setWin(true) : correctGuesses.current++;
      } else {
        if (guess[0].id !== guess[1].id) {
          correct.current.setAttribute("class", "incorrect");
          setTimeout(() => {
            guess[0].setAttribute("class", "wrong");
            guess[1].setAttribute("class", "wrong");
          }, 600);
        }
      }
      setTimeout(() => {
        correct.current.removeAttribute("class");
      }, 1000);
      setTimeout(() => (guess = []), 600);
    }
  }

  useEffect(() => {
    if (correctGuesses.current === 0)
      for (let i = 0; i < 18; i++) {
        generatePuzzle(matrix.current, i);
        console.log(i);
      }
    console.log("effect");
    if (effect === 0) {
      setEffect(1);
    }
  }, [effect]);

  let counter = 0;
  const markup = matrix.current.map((ele) =>
    ele.map((ele2) => {
      counter++;
      let id = counter;
      return (
        <div
          key={counter}
          id={counter}
          onClick={() => !guess[1] && guessHandler(id)}
        >
          <span>
            <img src={questionMark} alt="img" />
          </span>
          <img src={ele2} alt="img" />
        </div>
      );
    })
  );

  return (
    <div className="game">
      <p ref={correct} id="status"></p>
      <div className={`overlay ${!win && "not-shown"}`}></div>
      <div className={`win ${!win && "not-shown"}`}>
        <p>لقد فزت !</p>
        <button onClick={() => window.location.reload()}>اللعب مرة أخرى</button>
      </div>
      <div className="grid">{markup}</div>
    </div>
  );
}
