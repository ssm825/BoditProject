import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GraphDashBoard from 'pages/GraphDashBoard/GraphDashBoard';
import SensorList from 'pages/SensorList/SensorList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SensorList />} />
        <Route path="/dashboard" element={<GraphDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
