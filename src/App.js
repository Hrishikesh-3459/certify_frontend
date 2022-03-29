import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Certificate from "./component/Certificate";
import CreateCertificate from "./component/CreateCertificate";
import Login from "./component/Login";
import Home from "./component/Home";
import ProtectedRoute from "./component/ProtectedRoute";
import React from "react";
import ThemeProvider from "./context/ThemeProvider";
import VerifiedCertificate from "./component/VerifiedCertificate";
import AuthProvider from "./context/AuthProvider";

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<ProtectedRoute component={<Home />} />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='/certificate/*'
							element={<ProtectedRoute component={<Certificate />} />}
						/>
						<Route
							path='/create-certificate'
							element={<ProtectedRoute component={<CreateCertificate />} />}
						/>
						<Route path='/verify/*' element={<VerifiedCertificate />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
