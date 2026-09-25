import React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";
import { portofolioData } from "../data/portofolioData";
import { TextAnimation } from "../animations/TextAnimation";

export const Footer = ({ t, c }: any) => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const navItems = [
		{ id: "hero", label: t.nav.overview },
		{ id: "skills", label: t.nav.skills },
		{ id: "experience", label: t.nav.exp },
		{ id: "projects", label: t.nav.proj },
		{ id: "education", label: t.nav.edu },
		{ id: "contact", label: t.nav.contact },
	];

	return (
		<footer className={`relative border-t transition-colors duration-300 ${c("bg-white border-slate-200 text-slate-600", "bg-slate-950 border-slate-800 text-slate-400")}`}>
			<div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
					{/* Branding & About */}
					<div className="flex flex-col gap-4">
						<h3 className={`text-2xl font-bold tracking-tight ${c("text-slate-900", "text-white")}`}>
							Kevin Owen
						</h3>
						<p className="text-sm leading-relaxed max-w-sm">
							<TextAnimation text={t.hero.role} />
						</p>
						<div className="flex items-center gap-4 mt-2">
							<a href={portofolioData.contacts.github} target="_blank" rel="noreferrer" className={`hover:text-blue-500 transition-colors ${c("text-slate-500", "text-slate-400")}`}>
								<GithubIcon size={20} />
							</a>
							<a href={portofolioData.contacts.linkedin} target="_blank" rel="noreferrer" className={`hover:text-blue-500 transition-colors ${c("text-slate-500", "text-slate-400")}`}>
								<LinkedinIcon size={20} />
							</a>
							<a href={portofolioData.contacts.instagram} target="_blank" rel="noreferrer" className={`hover:text-blue-500 transition-colors ${c("text-slate-500", "text-slate-400")}`}>
								<InstagramIcon size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="flex flex-col gap-4 md:items-center">
						<h4 className={`text-lg font-bold ${c("text-slate-900", "text-white")}`}>
							Quick Links
						</h4>
						<ul className="flex flex-col gap-2">
							{navItems.map((item) => (
								<li key={item.id}>
									<a href={`#${item.id}`} className="hover:text-blue-500 transition-colors text-sm">
										<TextAnimation text={item.label} />
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="flex flex-col gap-4 md:items-end">
						<h4 className={`text-lg font-bold ${c("text-slate-900", "text-white")}`}>
							Contact
						</h4>
						<ul className="flex flex-col gap-2 text-sm md:text-right">
							<li>{portofolioData.contacts.email}</li>
							<li>{portofolioData.contacts.phoneDisplay}</li>
							<li>Bandung, Indonesia</li>
						</ul>
					</div>
				</div>

				<div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${c("border-slate-200", "border-slate-800")}`}>
					<p className="text-sm font-medium">
						© {new Date().getFullYear()} Kevin Owen. All rights reserved.
					</p>
					
					{/* Back to top button */}
					<button 
						onClick={scrollToTop}
						className={`flex items-center justify-center p-3 rounded-full transition-all hover:-translate-y-1 ${c("bg-blue-100 text-blue-600 hover:bg-blue-200", "bg-slate-800 text-blue-400 hover:bg-slate-700")}`}
						aria-label="Back to top"
					>
						<ArrowUp size={20} />
					</button>
				</div>
			</div>
		</footer>
	);
};
