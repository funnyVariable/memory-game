import Game from "./Game";
import github from "./github.svg";

import "./App.css";
import "./Normalize.css";
import "./Grid.css";
import { useState } from "react";

function App() {
  const [play, setPlay] = useState(false);
  return (
    <div className="app" dir="rtl">
      <h1>لعبة الذاكرة</h1>
      {play ? (
        <Game />
      ) : (
        <div className="main-menu">
          <button onClick={() => setPlay(true)}>لعب</button>
          <p>لعبة أحجية مطابقة بسيطة بأستخدام مكتبة Reactjs</p>
          <a href="#">
            <span>
              <p>غيت هب</p>
              <p>github</p>
            </span>
            <img src={github} alt="github" />
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
