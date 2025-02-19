"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserFromLocalStorage, signOut } from "../utils/auth";
import { useRouter } from "next/navigation";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const Router = useRouter();

	useEffect(() => {
		const storedUser = getUserFromLocalStorage();
		if (storedUser) {
			setUser(storedUser);
		}
	}, []);

	const signOutUser = () => {
		signOut();
        setUser(null);
        Router.push("/");
	};

	return (
		<AuthContext.Provider value={{ user, setUser, signOutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
