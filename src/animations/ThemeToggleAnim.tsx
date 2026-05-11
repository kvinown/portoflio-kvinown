import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
	theme: string;
	setTheme: (theme: "light" | "dark") => void;
	c: (l: string, d: string) => string;
}

export const ThemeToggle = ({ theme, setTheme, c }: ThemeToggleProps) => {
	const toggleTheme = (e: React.MouseEvent) => {
		const isDark = theme === "dark";

		// Memeriksa dukungan API View Transition
		if (!(document as any).startViewTransition) {
			setTheme(isDark ? "light" : "dark");
			return;
		}

		const transition = (document as any).startViewTransition(() => {
			setTheme(isDark ? "light" : "dark");
		});

		const x = e.clientX;
		const y = e.clientY;
		const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

		transition.ready.then(() => {
			const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

			document.documentElement.animate(
				{
					clipPath: isDark ? clipPath.reverse() : clipPath,
				},
				{
					duration: 500,
					easing: "ease-in-out",
					pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
				},
			);
		});
	};

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-full transition-all duration-300 active:scale-90 ${c("bg-slate-100 text-slate-600", "bg-slate-800 text-yellow-400")}`}>
			{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
		</button>
	);
};
