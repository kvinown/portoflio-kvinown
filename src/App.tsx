import React, { useState } from "react";

// Import Layout, Data, dan Halaman
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { portofolioData } from "./data/portofolioData";

const App = () => {
	// Semua state global (Tema & Bahasa) diatur di sini
	const [lang, setLang] = useState<"id" | "en">("id");
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	// Variabel helper untuk dioper ke komponen lain
	const t = portofolioData[lang];
	const c = (lightClass: string, darkClass: string) => (theme === "dark" ? darkClass : lightClass);

	return (
		// <Layout> berfungsi persis seperti @extends('layout.app') di Laravel
		<Layout
			lang={lang}
			setLang={setLang}
			theme={theme}
			setTheme={setTheme}
			t={t}
			c={c}>
			{/* <HomePage /> ini berfungsi persis seperti isi dari @section('content') */}
			<HomePage
				t={t}
				c={c}
				theme={theme}
				portofolioData={portofolioData}
			/>
		</Layout>
	);
};

export default App;
