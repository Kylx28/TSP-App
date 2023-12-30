import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import TSPMap from './Map';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/map" element={<TSPMap/>}/>
      </Routes>
    </Router>
  )
}

export default App;