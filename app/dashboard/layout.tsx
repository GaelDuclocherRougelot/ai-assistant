"use client";
import type { ReactNode } from "react"
import Link from "next/link"
import { Brain, Calendar, MessageSquare, User, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  const { signOutUser, user } = useAuth();

  return (
		<div className="flex h-full">
			<aside className="w-64 bg-white shadow-md fixed top-0 left-0 h-screen z-10">
				<div className="p-4">
					<Link
						href="/dashboard"
						className="flex items-center space-x-2 text-blue-600"
					>
						<Brain className="h-8 w-8" />
						<span className="text-xl font-bold">AI Journal</span>
					</Link>
				</div>
				<nav className="mt-8">
					<Link
						href="/dashboard"
						className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						<Calendar className="h-5 w-5" />
						<span>Calendrier</span>
					</Link>
					<Link
						href="/dashboard/chat"
						className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						<MessageSquare className="h-5 w-5" />
						<span>Chat IA</span>
					</Link>
					<Link
						href="/dashboard/profile"
						className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						<User className="h-5 w-5" />
						<span>Profil</span>
					</Link>
				</nav>
			</aside>
			<main className="flex-1 pl-72 pr-8 py-8">
				<div className="mb-8 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-800">
						Bienvenue {user?.displayName.split(" ").splice(0, 1)}
					</h1>
					<button
						onClick={signOutUser}
						className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
					>
						<LogOut className="h-5 w-5" />
						<span>Déconnexion</span>
					</button>
				</div>
				{children}
			</main>
		</div>
  );
}

