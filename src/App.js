import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Timer from "./TImer";
import Word from "./Word";

const getCloud = () =>
  `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry Lorem Ipsum has been the industry standard dummy text ever
  since the 1500s when an unknown printer took a galley of type and
  scrambled it to make a type specimen book It has survived not only
  five centuries but also the leap into electronic typesetting
  remaining essentially unchanged It was popularised in the 1960s with
  the release of Letraset sheets containing Lorem Ipsum passages and
  more recently with desktop publishing software like Aldus PageMaker
  including versions of Lorem Ipsum`.split(" ");

function App() {
  const [input, setInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const cloud = useRef(getCloud());
  const [startCounting, setStartCounting] = useState(false);

  const processInput = (value) => {
    if (activeWordIndex === cloud.current.length) {
      return;
    }
    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      //on FInish
      if (activeWordIndex === cloud.current.length - 1) {
        //overFlow
        setStartCounting(false);
        setInput("completed");
      } else {
        setInput("");
      }

      setActiveWordIndex((index) => index + 1);

      //correct word
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setInput(value);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Typewriter</h1>
        <Timer
          startCounting={startCounting}
          correctWords={correctWordArray.filter(Boolean).length}
        />
      </div>
      <div className="text">
        <p>
          {cloud.current.map((word, index) => {
            return (
              <Word
                text={word}
                active={index === activeWordIndex}
                correct={correctWordArray[index]}
              />
            );
          })}
        </p>
      </div>
      <div className="input-cls">
        <input
          value={input}
          placeholder="Here you go click on the below button to start"
          onChange={(e) => processInput(e.target.value)}
        ></input>
      </div>
      <div className="help">
        <p>
          <span style={{ backgroundColor: "yellow" }}>Tips</span> : Type in the
          above dummy text in the input box to start typing test. Click on space
          to type next word.{" "}
          <span style={{ backgroundColor: "green" }}>Green</span> indicates you
          typed correctly whereas{" "}
          <span style={{ backgroundColor: "red" }}>Red</span> indicates you
          typed wrongly.
        </p>
      </div>
    </div>
  );
}

export default App;
