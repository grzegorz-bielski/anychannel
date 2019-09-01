import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  const [state, setState] = useState("nope");

  useEffect(() => {
    fetch("./api/users")
      .then(res => res.json())
      .then(value => setState(JSON.stringify(value)))
      .catch(err => {
        !(err instanceof SyntaxError) && setState(JSON.stringify(err));
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>{state}</span>
        <p>
          Edifffddff <code>src/App.tsx</code> and save to reload.....
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
