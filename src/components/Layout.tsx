import React from "react";
import { Navbar } from "./Navbar";

// Mendefinisikan props yang dibutuhkan Layout
interface LayoutProps {
	lang: "id" | "en";
	setLang: (lang: "id" | "en") => void;
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	t: any;
	c: (lightClass: string, darkClass: string) => string;
	children: React.ReactNode; // Ini pengganti @yield('content')
}

export const Layout: React.FC<LayoutProps> = ({ lang, setLang, theme, setTheme, t, c, children }) => {
	return (
		<div className={`min-h-screen font-sans selection:bg-blue-300 scroll-smooth transition-colors duration-300 overflow-x-hidden ${c("bg-slate-50 text-slate-800", "bg-slate-900 text-slate-200")}`}>
			{/* NAVBAR SELALU ADA DI ATAS */}
			<Navbar
				lang={lang}
				setLang={setLang}
				theme={theme}
				setTheme={setTheme}
				t={t}
				c={c}
			/>

			{/* ISI KONTEN (HERO, SKILLS, DLL) AKAN MUNCUL DI SINI */}
			{children}

			{/* FOOTER SELALU ADA DI BAWAH */}
			<footer className={`py-8 text-center border-t transition-colors duration-300 mt-10 ${c("bg-white border-slate-200 text-slate-500", "bg-slate-950 border-slate-800 text-slate-400")}`}>
				<p className="font-medium">© {new Date().getFullYear()} Kevin Owen. Built with React & Tailwind CSS.</p>
			</footer>
		</div>
	);
};
