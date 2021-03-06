import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Trivia from "./components/Trivia.jsx";
import data from "./data";
import dataB from "./dataB";
import Timer from "./components/Timer.jsx";
import Start from "./components/Start.jsx";
import useSound from "use-sound";
import applause from "./assets/applause-01.mp3";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("currentUser"));
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("£ 0");
  const [jackPot] = useSound(applause);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "£ 100" },
        { id: 2, amount: "£ 200" },
        { id: 3, amount: "£ 300" },
        { id: 4, amount: "£ 500" },
        { id: 5, amount: "£ 1.000" },
        { id: 6, amount: "£ 2.000" },
        { id: 7, amount: "£ 4.000" },
        { id: 8, amount: "£ 8.000" },
        { id: 9, amount: "£ 16.000" },
        { id: 10, amount: "£ 32.000" },
        { id: 11, amount: "£ 64.000" },
        { id: 12, amount: "£ 125.000" },
        { id: 13, amount: "£ 250.000" },
        { id: 14, amount: "£ 500.000" },
        { id: 15, amount: "£ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    questionNumber > 15 && setStop(true);
  }, [moneyPyramid, questionNumber]);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const changeUser = () => {
    localStorage.removeItem("currentUser");
    refreshPage();
  };

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <>
                <h1 className="endText">
                  {username}, You earned: {earned} {questionNumber > 15 && jackPot()} {questionNumber > 15 && <h2>YOU WON THE JACKPOT!!!</h2>}
                </h1>
                <button className="buttonAgain" onClick={refreshPage}>
                  Play again
                </button>

                <button className="buttonAgain" onClick={changeUser}>
                  Change user
                </button>
              </>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                  <h1 className="userId">Let's play {username} !</h1>
                </div>
                <div className="bottom">
                  <Trivia data={data} dataB={dataB} setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} />
                </div>
              </>
            )}
          </div>

          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li className={questionNumber === m.id ? "moneyListItem active " : "moneyListItem"}>
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} username={username} />
      )}
    </div>
  );
}

export default App;
