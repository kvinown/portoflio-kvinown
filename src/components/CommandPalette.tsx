import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Moon, Sun, Globe, User, Code, Briefcase, Award, Mail, Command } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface CommandPaletteProps {
	lang: "id" | "en";
	setLang: (lang: "id" | "en") => void;
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	setIsCliMode: (val: boolean) => void;
	c: (l: string, d: string) => string;
	t: any;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ lang, setLang, theme, setTheme, setIsCliMode, c, t }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}
			if (e.key === "Escape" && isOpen) {
				setIsOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			setSearch("");
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const handleScroll = (id: string) => {
		setIsOpen(false);
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};

	const commands = [
		{
			category: "Navigation",
			items: [
				{ icon: <User size={18} />, label: "Go to About", action: () => handleScroll("about") },
				{ icon: <Code size={18} />, label: "Go to Skills", action: () => handleScroll("skills") },
				{ icon: <Briefcase size={18} />, label: "Go to Projects", action: () => handleScroll("projects") },
				{ icon: <Briefcase size={18} />, label: "Go to Experience", action: () => handleScroll("experience") },
				{ icon: <Award size={18} />, label: "Go to Certifications", action: () => handleScroll("certifications") },
			]
		},
		{
			category: "Actions",
			items: [
				{ icon: <Terminal size={18} />, label: "Open Terminal Mode", action: () => { setIsOpen(false); setIsCliMode(true); } },
				{ icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />, label: `Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'})`, action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); } },
				{ icon: <Globe size={18} />, label: `Change Language (${lang === 'en' ? 'ID' : 'EN'})`, action: () => { setLang(lang === 'en' ? 'id' : 'en'); } },
			]
		},
		{
			category: "Links",
			items: [
				{ icon: <GithubIcon size={18} />, label: "Open GitHub", action: () => { window.open(t.contacts.github, "_blank"); setIsOpen(false); } },
				{ icon: <LinkedinIcon size={18} />, label: "Open LinkedIn", action: () => { window.open(t.contacts.linkedin, "_blank"); setIsOpen(false); } },
				{ icon: <Mail size={18} />, label: "Send Email", action: () => { window.open(`mailto:${t.contacts.email}`); setIsOpen(false); } },
			]
		}
	];

	const filteredCommands = commands.map(cat => ({
		...cat,
		items: cat.items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
	})).filter(cat => cat.items.length > 0);

	return (
		<div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
			
			{/* Modal */}
			<div className={`relative w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden border ${c("bg-white border-slate-200", "bg-slate-900 border-slate-700")} transform transition-all`}>
				<div className={`flex items-center px-4 border-b ${c("border-slate-100", "border-slate-800")}`}>
					<Search size={20} className={c("text-slate-400", "text-slate-500")} />
					<input 
						ref={inputRef}
						type="text" 
						className={`w-full bg-transparent p-4 outline-none text-[15px] ${c("text-slate-800 placeholder:text-slate-400", "text-slate-200 placeholder:text-slate-500")}`}
						placeholder="Type a command or search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div className="flex gap-1 shrink-0">
						<kbd className={`px-2 py-1 text-[10px] font-mono rounded border ${c("bg-slate-100 border-slate-200 text-slate-500", "bg-slate-800 border-slate-700 text-slate-400")}`}>ESC</kbd>
					</div>
				</div>

				<div className="max-h-[350px] overflow-y-auto p-2">
					{filteredCommands.length === 0 ? (
						<div className="p-8 text-center text-slate-500 text-sm">No results found.</div>
					) : (
						filteredCommands.map((cat, idx) => (
							<div key={idx} className="mb-2">
								<div className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${c("text-slate-400", "text-slate-500")}`}>
									{cat.category}
								</div>
								{cat.items.map((item, i) => (
									<button 
										key={i}
										onClick={item.action}
										className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors ${c("text-slate-700 hover:bg-slate-100", "text-slate-300 hover:bg-slate-800 hover:text-white")}`}
									>
										<span className={c("text-slate-400", "text-slate-500")}>{item.icon}</span>
										{item.label}
									</button>
								))}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};
