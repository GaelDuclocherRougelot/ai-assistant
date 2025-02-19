"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		// Store user data in local storage
		localStorage.setItem(
			"user",
			JSON.stringify({
				uid: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL,
			})
		);

		return user;
	} catch (error) {
		console.error(error);
		// Handle errors here, such as displaying a notification
	}
};

export default signInWithGoogle;
