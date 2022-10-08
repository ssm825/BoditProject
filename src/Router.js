import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GraphDashBoard from 'pages/GraphDashBoard/GraphDashBoard';
import SensorList from 'pages/SensorList/SensorList';
import Calender from 'pages/SensorList/Calender';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SensorList />} />
        <Route path="/:date" element={<Calender />} />
        <Route path="/GraphDashBoard" element={<GraphDashBoard />} />
        <Route
          path="/b"
          component={() => {
            window.location.href = 'https://example.com/1234';
            return null;
          }}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
