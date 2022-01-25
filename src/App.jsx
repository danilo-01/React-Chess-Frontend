import Board from "./Components/Board/Board";
import "./app.scss";
import LoginSignup from "./Components/LoginSignup/LoginSignup";

function App() {
  return (
    <div className="app">
      <div className="content">
        <div className="title">
          <h3>REACT</h3>
          <h2>CHESS</h2>
        </div>
        <Board />

        <LoginSignup />
      </div>
    </div>
  );
}

export default App;
