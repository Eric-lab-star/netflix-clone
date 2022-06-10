import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>hello</div>} />
      </Routes>
    </div>
  );
}

export default App;
