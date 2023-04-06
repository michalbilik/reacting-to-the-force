import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import PersonDetails from "./components/PersonDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/person/:name" element={<PersonDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
