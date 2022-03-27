import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Certificate from "./component/Certificate";
import CreateCertificate from "./component/CreateCertificate";
import Login from "./component/Login";
import Home from "./component/Home";
import ProtectedRoute from "./component/ProtectedRoute";
import React from "react";
import ThemeProvider from "./context/ThemeProvider";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute component={<Home />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/certificate/*" element={<Certificate />} />
            <Route
              path="/create-certificate"
              element={<ProtectedRoute component={<CreateCertificate />} />}
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
