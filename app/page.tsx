import GoogleAuth from "@/components/GoogleAuth";
import { Brain, Calendar, Lock, MessageSquare, PenTool } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-white shadow-sm">
				<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="flex items-center">
						<Brain className="h-8 w-8 text-blue-600 mr-2" />
						<span className="text-xl font-bold text-gray-800">
							AI Journal
						</span>
					</div>
					<div>
						{/* <Link
							href="/login"
							className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
						>
							Se connecter
						</Link> */}
						<GoogleAuth />
					</div>
				</nav>
			</header>

			<main className="flex-grow">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-4xl font-bold mb-6">
								Votre Assistant Personnel IA pour Journaliser
								Votre Vie
							</h1>
							<p className="text-xl mb-8">
								Notez vos journées, obtenez des récapitulatifs
								intelligents, et interagissez avec votre
								historique personnel grâce à l'IA.
							</p>
							<Link
								href="/signup"
								className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
							>
								Commencer Gratuitement
							</Link>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-20 bg-gray-50">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">
							Fonctionnalités Principales
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<FeatureCard
								icon={
									<Calendar className="h-12 w-12 text-blue-600" />
								}
								title="Calendrier Interactif"
								description="Notez vos journées et votre humeur dans un calendrier facile à utiliser."
							/>
							<FeatureCard
								icon={
									<MessageSquare className="h-12 w-12 text-blue-600" />
								}
								title="Chat IA Intelligent"
								description="Posez des questions sur vos journées passées et obtenez des réponses pertinentes."
							/>
							<FeatureCard
								icon={
									<PenTool className="h-12 w-12 text-blue-600" />
								}
								title="Récapitulatifs Personnalisés"
								description="Obtenez des résumés intelligents de vos semaines et mois."
							/>
						</div>
					</div>
				</section>

				{/* Technologies Section */}
				<section className="py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">
							Technologies Utilisées
						</h2>
						<div className="flex flex-wrap justify-center items-center gap-8">
							<TechLogo
								src="/placeholder.svg?height=60&width=60"
								alt="Next.js"
								name="Next.js"
							/>
							<TechLogo
								src="/placeholder.svg?height=60&width=60"
								alt="Docker"
								name="Docker"
							/>
							<TechLogo
								src="/placeholder.svg?height=60&width=60"
								alt="Firebase"
								name="Firebase"
							/>
							<TechLogo
								src="/placeholder.svg?height=60&width=60"
								alt="OpenAI"
								name="OpenAI"
							/>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-blue-600 text-white py-20">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-6">
							Prêt à Commencer Votre Journal IA ?
						</h2>
						<p className="text-xl mb-8">
							Rejoignez-nous dès aujourd'hui et découvrez une
							nouvelle façon de journaliser votre vie.
						</p>
						<Link
							href="/signup"
							className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
						>
							S'inscrire Maintenant
						</Link>
					</div>
				</section>
			</main>

			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-between items-center">
						<div className="w-full md:w-1/3 mb-6 md:mb-0">
							<h3 className="text-xl font-bold mb-2">
								AI Journal
							</h3>
							<p className="text-sm">
								Votre assistant personnel pour journaliser et
								analyser votre vie quotidienne.
							</p>
						</div>
						<div className="w-full md:w-1/3 mb-6 md:mb-0">
							<h4 className="text-lg font-semibold mb-2">
								Liens Rapides
							</h4>
							<ul className="text-sm">
								<li>
									<Link
										href="/about"
										className="hover:text-blue-300"
									>
										À Propos
									</Link>
								</li>
								<li>
									<Link
										href="/features"
										className="hover:text-blue-300"
									>
										Fonctionnalités
									</Link>
								</li>
								<li>
									<Link
										href="/pricing"
										className="hover:text-blue-300"
									>
										Tarifs
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="hover:text-blue-300"
									>
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div className="w-full md:w-1/3">
							<h4 className="text-lg font-semibold mb-2">
								Sécurité
							</h4>
							<p className="text-sm flex items-center">
								<Lock className="h-4 w-4 mr-2" />
								Vos données sont sécurisées et cryptées
							</p>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
						<p>
							&copy; {new Date().getFullYear()} AI Journal. Tous
							droits réservés.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({ icon, title, description }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<div className="mb-4">{icon}</div>
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
}

function TechLogo({ src, alt, name }) {
	return (
		<div className="flex flex-col items-center">
			<Image
				src={src || "/placeholder.svg"}
				width={60}
				height={60}
				alt={alt}
				className="mb-2"
			/>
			<span className="text-sm font-medium">{name}</span>
		</div>
	);
}
