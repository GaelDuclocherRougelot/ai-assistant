export const getUserFromLocalStorage = () => {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
	return !!getUserFromLocalStorage();
};

export const signOut = () => {
	localStorage.removeItem("user");
};
