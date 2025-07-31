import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MondayBoard from "./modules/monday-board";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MondayBoard />} />
      </Routes>
    </Router>
  );
};

export default App;
