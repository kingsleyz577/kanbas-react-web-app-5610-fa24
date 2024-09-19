import React from 'react';
import logo from './logo.svg';
import './App.css';
import Labs from "./Labs"
import Kanbas from './Kanbas';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div> 
      <HashRouter>
        <div>
        <Routes>
          <Route path = "/Labs/*" element={<Labs />} />
          <Route path = "/Kanbas/*" element={<Kanbas />} />
       </Routes>
       </div>
      </HashRouter>
    </div>
  );
}

export default App;
