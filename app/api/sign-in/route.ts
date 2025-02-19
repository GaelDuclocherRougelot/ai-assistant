import { signInWithPopup } from "firebase/auth";
import type { NextApiResponse } from "next";
import { auth, googleProvider } from "../firebase/route";

export async function POST(res: NextApiResponse) {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		res.status(200).json({ user: result.user });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
