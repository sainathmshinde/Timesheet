import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes"; // Import routes
import AppLayout from "./components/layout/AppLayout";

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index + route.path}
              path={route.path}
              element={route.component} // Wrap component with layout
            />
          ))}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
