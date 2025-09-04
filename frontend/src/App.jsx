import { useState } from "react";
import axios from "axios";

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOperation = async (operation) => {
    if (!a || !b) {
      alert("Please enter both numbers");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/${operation}`, {
        a: Number(a),
        b: Number(b),
      });
      setResult(res.data.result);
    } catch (err) {
      setResult(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Blockchain Calculator</h1>
      <div className="inputs">
        <input
          type="number"
          placeholder="Enter first number"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter second number"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={() => handleOperation("add")}>Add</button>
        <button onClick={() => handleOperation("subtract")}>Subtract</button>
        <button onClick={() => handleOperation("multiply")}>Multiply</button>
        <button onClick={() => handleOperation("divide")}>Divide</button>
      </div>
      <p className="result">
        {loading ? "Processing transaction..." : `Result: ${result}`}
      </p>
    </div>
  );
}

export default App;
