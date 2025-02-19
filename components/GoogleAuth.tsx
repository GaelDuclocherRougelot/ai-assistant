'use client'
import signInWithGoogle from "@/utils/signWithGoogle";

const SignInButton = () => {
	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignInButton;
