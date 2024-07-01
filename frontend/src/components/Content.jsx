// src/components/Content.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Table from './Table';
import Graph from './Graph';
import Alert from './Alert';
import Another from './Another';

const Content = () => {
  return (
    <div className="flex p-4 bg-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/another" element={<Another />} />
      </Routes>
    </div>
  );
};

export default Content;
