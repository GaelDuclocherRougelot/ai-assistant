'use client'
import { useAuth } from "@/context/AuthContext";
import signInWithGoogle from "@/utils/signWithGoogle";
import { useRouter } from "next/navigation";

const SignInButton = () => {
	const { setUser, user } = useAuth();
	const Router = useRouter();
	
	const handleSignIn = async () => {
		const user = await signInWithGoogle();
		if (user) {
			setUser(user);
			Router.push("/dashboard");
		}
	};

	if (user) {
		return <button onClick={() => Router.push('/dashboard')}>Mon compte</button>;
	} else {
		return <button onClick={handleSignIn}>Se connecter avec Google</button>;
	}
};

export default SignInButton;
