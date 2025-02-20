"use client";
import { useAuth } from "@/context/AuthContext";
import signInWithGoogle from "@/utils/signWithGoogle";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const SignInButton = () => {
	const { setUser, user } = useAuth();
	const Router = useRouter();

	const handleSignIn = async () => {
		const user = await signInWithGoogle();
		if (user) {
			setUser(user);
			Router.push("/dashboard");
			toast({
				title: "Sign In Successful",
				description: `Welcome, ${user.displayName}!`,
			});
		}
	};

	if (user) {
		return (
			<button onClick={() => Router.push("/dashboard")}>
				Mon compte
			</button>
		);
	} else {
		return <button onClick={handleSignIn}>Se connecter avec Google</button>;
	}
};

export default SignInButton;
