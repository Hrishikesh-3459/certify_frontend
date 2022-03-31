import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Certificate from "./component/Certificate";
import CreateCertificate from "./component/CreateCertificate";
import Login from "./component/Login";
import Home from "./component/Home";
import ProtectedRoute from "./component/ProtectedRoute";
import React from "react";
import ThemeProvider from "./context/ThemeProvider";
import VerifiedCertificate from "./component/VerifiedCertificate";
import AuthProvider from "./context/AuthProvider";
import UtilityProvider from "./context/UtilityProvider";

function App() {
  return (
    <UtilityProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute component={<Home />} />}
              />
              <Route path="/login" element={<Login />} />
              {/* <Route
                path="/certificate/:id"
                element={<ProtectedRoute component={<Certificate />} />}
              /> */}
              <Route
                path="/create-certificate"
                element={<ProtectedRoute component={<CreateCertificate />} />}
              />
              <Route path="/verify/:id" element={<VerifiedCertificate />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </UtilityProvider>
  );
}

export default App;
