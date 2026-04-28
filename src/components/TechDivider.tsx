import React from "react";

export const TechDivider = ({ theme }: { theme: "light" | "dark" }) => (
	<div className="flex items-center justify-center py-6 opacity-60">
		<div className={`h-px flex-1 bg-gradient-to-r ${theme === "dark" ? "from-transparent to-slate-700" : "from-transparent to-slate-300"}`}></div>
		<div className={`mx-4 w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "bg-blue-400"}`}></div>
		<div className={`h-px flex-1 bg-gradient-to-l ${theme === "dark" ? "from-transparent to-slate-700" : "from-transparent to-slate-300"}`}></div>
	</div>
);
