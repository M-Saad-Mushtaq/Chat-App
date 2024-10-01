import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import NavBar from "./components/navbar/Navbar.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import { useAuthContext } from "./context/AuthContext.js";

function App() {
  const [showSidebar, setShowSidebar] = React.useState(false);

  function toggleShowSidebar() {
    setShowSidebar(() => {
      return !showSidebar;
    });
  }

  const { authUser } = useAuthContext();

  return (
    <>
      <NavBar toggleShowSidebar={toggleShowSidebar} />
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={
              authUser ? (
                <Home showSidebar={showSidebar} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
