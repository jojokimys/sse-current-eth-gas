import "./App.css";
import { useEffect, useState, useRef } from "react";

const App = () => {
  const [gas, setGas] = useState("");

  const sourceRef = useRef();

  useEffect(() => {
    if (!sourceRef.current) {
      sourceRef.current = new EventSource("http://localhost:3001/gas", { withCredentials: false });
      sourceRef.current.addEventListener(
        "message",
        (e) => {
          const [a, b, ...rest] = [...e.data];
          setGas(`${a}${b}.${rest.splice(0, 3).join("")}`);
        },
        false,
      );
    }
  }, [sourceRef]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Current Gas Fee{" "}
          <a className="App-link" href="https://etherscan.io/gastracker">
            {gas} gwei
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
