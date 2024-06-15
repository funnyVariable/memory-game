import { Fragment } from "react";

import apple from "./img/apple.svg";
import appleGreen from "./img/apple-green.svg";
import cat from "./img/cat.svg";
import catGrin from "./img/catGrin.svg";
import cloud from "./img/cloud.svg";
import cloudLightning from "./img/cloudLightning.svg";
import cloudLightningRain from "./img/cloudLightningRain.svg";
import cloudRain from "./img/cloudRain.svg";
import cloudSnow from "./img/cloudSnow.svg";
import cloudSun from "./img/cloudSun.svg";
import faceDisguised from "./img/faceDisguised.svg";
import faceFrown from "./img/faceFrown.svg";
import faceMonocle from "./img/faceMonocle.svg";
import faceNoMouth from "./img/faceNoMouth.svg";
import faceOpenMouth from "./img/faceOpenMouth.svg";
import faceRaisedEyebrow from "./img/faceRaisedEyebrow.svg";
import faceSlightlySmiling from "./img/faceSlightlySmiling.svg";
import fire from "./img/fire.svg";
import ice from "./img/ice.svg";
import moon from "./img/moon.svg";
import orange from "./img/orange.svg";
import palmTree from "./img/palmTree.svg";
import pineapple from "./img/pineapple.svg";
import questionMark from "./img/questionMark.svg";
import star from "./img/star.svg";
import starGlowing from "./img/starGlowing.svg";
import sun from "./img/sun.svg";
import tree from "./img/tree.svg";
import water from "./img/water.svg";
import watermelon from "./img/watermelon.svg";

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
    const n = rand(30);

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
      matrix[cell1.y][cell1.x] = <div>{}</div>;
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
