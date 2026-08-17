import React, { useState, useEffect } from "react";
import { Terminal, Languages, X, Menu } from "lucide-react";
import { TextAnimation } from "../animations/TextAnimation";
import { ThemeToggle } from "../animations/ThemeToggle";

interface NavbarProps {
	lang: "id" | "en";
	setLang: (lang: "id" | "en") => void;
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	t: any;
	c: (lightClass: string, darkClass: string) => string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, theme, setTheme, t, c }) => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("hero");

	useEffect(() => {
		const handleScroll = () => {
			const sections = ["hero", "skills", "experience", "projects", "education", "contact"];
			let current = "hero";
			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					// Add an offset to trigger earlier when scrolling down
					const rect = element.getBoundingClientRect();
					if (rect.top <= 150) {
						current = section;
					}
				}
			}
			setActiveSection(current);
		};

		window.addEventListener("scroll", handleScroll);
		// Call once to set initial state
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ id: "hero", label: t.nav.overview },
		{ id: "skills", label: t.nav.skills },
		{ id: "experience", label: t.nav.exp },
		{ id: "projects", label: t.nav.proj },
		{ id: "education", label: t.nav.edu },
		{ id: "contact", label: t.nav.contact },
	];

	return (
		<nav className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b transition-colors duration-300 ${c("bg-white/80 border-slate-200 shadow-sm", "bg-slate-950/80 border-slate-800")}`}>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				{/* LOGO */}
				<div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${c("text-slate-900", "text-white")}`}>
					<Terminal
						size={24}
						className="text-blue-500"
					/>
					<span>kvinown</span>
				</div>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-8 text-sm font-medium">
					<div className="flex gap-6">
						{navItems.map((item) => (
							<a
								key={item.id}
								href={`#${item.id}`}
								className={`transition-colors hover:text-blue-500 ${
									activeSection === item.id ? "text-blue-500 font-bold" : c("text-slate-600", "text-slate-300")
								}`}>
								<TextAnimation text={item.label} />
							</a>
						))}
					</div>

					<div className="flex items-center gap-4 pl-6 border-l border-slate-300 dark:border-slate-700">
						<button
							aria-label="Toggle language"
							onClick={() => setLang(lang === "id" ? "en" : "id")}
							className={`flex items-center gap-1 hover:text-blue-500 transition-colors ${c("text-slate-600", "text-slate-300")}`}>
							<Languages size={18} />
							<span className="uppercase inline-block w-6">
								<TextAnimation text={lang} />
							</span>
						</button>
						<ThemeToggle
							theme={theme}
							setTheme={setTheme}
							c={c}
						/>
					</div>
				</div>

				{/* Mobile Controls */}
				<div className="md:hidden flex items-center gap-4">
					<ThemeToggle
						theme={theme}
						setTheme={setTheme}
						c={c}
					/>
					<button
						aria-label="Toggle language"
						onClick={() => setLang(lang === "id" ? "en" : "id")}
						className={`flex items-center gap-1 ${c("text-slate-600", "text-slate-300")}`}>
						<span className="uppercase text-sm font-bold inline-block w-6">
							<TextAnimation text={lang} />
						</span>
					</button>
					<button
						aria-label="Toggle navigation menu"
						className={c("text-slate-800", "text-slate-200")}
						onClick={() => setIsNavOpen(!isNavOpen)}>
						{isNavOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Dropdown */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isNavOpen ? "max-h-[500px] opacity-100 border-b" : "max-h-0 opacity-0 border-transparent"} ${c("bg-white border-slate-200 text-slate-700", "bg-slate-900 border-slate-800 text-slate-300")}`}>
				<div className="px-6 py-4 flex flex-col gap-4 shadow-xl text-center">
					{navItems.map((item) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={() => setIsNavOpen(false)}
							className={`font-medium hover:text-blue-500 ${
								activeSection === item.id ? "text-blue-500 font-bold" : ""
							}`}>
							<TextAnimation text={item.label} />
						</a>
					))}
				</div>
			</div>
		</nav>
	);
};
