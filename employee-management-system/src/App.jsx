import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes"; // Import routes

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index + route.path}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
