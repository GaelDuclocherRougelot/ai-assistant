const signInWithGoogle = async () => {
	try {
		const response = await fetch("/api/sign-in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to sign in with Google");
		}

		const data = await response.json();
		console.log(data.user);
	} catch (error) {
		console.error(error);
		// Handle errors here, such as displaying a notification
	}
};

export default signInWithGoogle;
