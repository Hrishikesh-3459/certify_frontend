import React, { useState, useEffect } from "react";
import { createTokenizedFetch, setNormalFetch } from "../libs/axiosClient";

export const AuthContext = React.createContext({ user: null });

const profile = "PROFILE";

export default function AuthProvider({ children }) {
	const [user, setUser] = useState();
	useEffect(() => {
    const userProfile = localStorage.getItem(profile);
		const localData = userProfile ? JSON.parse(userProfile) : null;
		console.log(localData);
		if (localData !== null && localData.token) {
			createTokenizedFetch(localData.token);
			setUser({});
		} else {
			setUser(null);
		}
	}, []);

	const addUser = (data) => {
		setUser(data);
	};
	const addToken = (token) => {
		localStorage.setItem(profile, JSON.stringify({ token }));
		setUser({});
		createTokenizedFetch(token);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem(profile);
		setNormalFetch();
	};

	const value = {
		user,
		addUser,
		addToken,
		logout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
