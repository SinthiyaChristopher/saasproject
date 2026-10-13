import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Plans from "./pages/Plans";
import Subscriptions from "./pages/Subscriptions";
import Revenue from "./pages/Revenue";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure CSS is imported


function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/revenue" element={<Revenue />} />
            </Routes>
          </main>
          {/* Only ToastContainer is needed */}
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;