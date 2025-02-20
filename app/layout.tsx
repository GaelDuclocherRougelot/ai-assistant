import { Inter } from "next/font/google";
import type React from "react";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "AI Journal",
	description: "Votre assistant personnel pour journaliser votre vie",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<AuthProvider>
				<body className={inter.className}>
					{children}
					<Toaster />
				</body>
			</AuthProvider>
		</html>
	);
}

import "./globals.css";import { Toaster } from "@/components/ui/toaster";

