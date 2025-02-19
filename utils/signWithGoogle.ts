"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider)

		return result.user;
	} catch (error) {
		console.error(error);
		// Handle errors here, such as displaying a notification
	}
};

export default signInWithGoogle;
