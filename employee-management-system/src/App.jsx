import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
