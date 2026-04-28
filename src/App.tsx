import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Globe, Server, Layout, Smartphone, Database, Wrench, ChevronRight, Send, Menu, X, Sun, Moon, Languages, Briefcase, Users, Terminal, Download } from "lucide-react";

// === GUDANG DATA JSON ===
const portofolioData = {
	contacts: {
		phoneWa: "6281318587942",
		phoneDisplay: "(+62) 813-1858-7942",
		email: "kvinown@gmail.com",
		instagram: "https://instagram.com/kvinown",
		github: "https://github.com/kvinown",
		linkedin: "https://linkedin.com/in/kvinown",
		web: "https://kvinown.netlify.app",
		cvFileName: "Resume CV Kevin Owen (1).pdf", // Nama file CV yang nanti ditaruh di folder public
	},
	skills: [
		{ id: 1, icon: "server", title: "Programming Languages", items: ["PHP", "TypeScript", "Python", "Kotlin", "JavaScript"] },
		{ id: 2, icon: "layout", title: "Web Development", items: ["Laravel", "Node.js", "React.js", "Vue", "Django"] },
		{ id: 3, icon: "smartphone", title: "Mobile Development", items: ["Flutter", "Jetpack Compose"] },
		{ id: 4, icon: "database", title: "Database & Cloud", items: ["MySQL", "Firebase"] },
		{ id: 5, icon: "wrench", title: "Tools & Version Control", items: ["Git/GitHub", "Postman", "Google Workspace"] },
	],
	id: {
		nav: { exp: "Pengalaman", proj: "Proyek", skills: "Keahlian", contact: "Kontak" },
		hero: {
			role: "Fullstack Developer | Backend Specialist",
			desc: "Lulusan Teknik Informatika dengan fondasi kuat dalam Fullstack Development, berspesialisasi pada sistem Backend. Berpengalaman mengembangkan aplikasi web yang terukur, kode yang terstruktur, dan manajemen basis data yang efisien. Memiliki kemampuan analitis dan problem-solving yang kuat, serta terbukti mampu berkolaborasi efektif dalam tim untuk mencapai tujuan proyek.",
			btnEmail: "Email Saya",
			btnWa: "WhatsApp",
			btnDownload: "Unduh CV",
		},
		sections: { skills: "Keahlian Teknis", expWork: "Pengalaman Kerja", expOrg: "Pengalaman Organisasi", proj: "Proyek (Tugas Akhir)", edu: "Pendidikan", contact: "Mari Berkolaborasi" },
		experience: {
			work: [
				{
					period: "Sep 2023 - Jan 2024",
					role: "Lecturer Assistant",
					place: "Maranatha Christian University",
					points: ["Basic Programming: Mendukung dan membimbing mahasiswa dalam pemahaman coding fundamental.", "Advanced Database: Membantu dalam pengembangan dan manajemen database yang scalable."],
				},
			],
			org: [
				{
					period: "Feb 2023 - Jan 2024",
					role: "Academic Division Member",
					place: "Senat Mahasiswa Fakultas Teknologi Informasi (SEMAFIT)",
					points: [
						"Secara aktif mengeksekusi dan mendukung implementasi program inti Divisi Akademik untuk mencapai target.",
						"Berkolaborasi lintas fungsi dengan divisi lain untuk mengorganisir berbagai event kemahasiswaan.",
						"Berperan sebagai Administrative Coordinator untuk Orientasi Mahasiswa Baru (INTEGER 2023).",
					],
				},
			],
		},
		projects: [
			{
				title: "CODE-CITE WEB",
				year: "2026",
				desc: "Pengembangan aplikasi berbasis web untuk kutipan kode (Code Citation). Fokus pada Web Development, Data Processing, dan Software Testing.",
				tags: ["Web Dev", "Data Processing", "Software Testing"],
			},
			{
				title: "CODE-CITE EXTENSION",
				year: "2026",
				desc: "Pengembangan plugin Visual Studio Code untuk kutipan kode terstruktur. Fokus pada Plugin Development, Software Engineering, dan Usability Evaluation.",
				tags: ["VS Code", "Plugin Dev", "Software Engineering"],
			},
		],
		education: {
			degree: "S1 Teknik Informatika",
			expertise: "Expertise: Backend Development & Prompt Engineering",
			gpaText: "IPK Terakhir",
		},
		contactForm: {
			desc: "Tertarik untuk bekerja sama atau memiliki pertanyaan? Jangan ragu untuk mengirimkan pesan melalui form di bawah ini.",
			nameLabel: "Nama Lengkap",
			emailLabel: "Email",
			msgLabel: "Pesan",
			btnIdle: "Kirim Pesan",
			btnSubmitting: "Mengirim...",
			btnSuccess: "Pesan Terkirim!",
		},
	},
	en: {
		nav: { exp: "Experience", proj: "Projects", skills: "Skills", contact: "Contact" },
		hero: {
			role: "Fullstack Developer | Backend Specialist",
			desc: "Informatics Engineering graduate with a strong foundation in Fullstack Development, specializing in Backend systems. Experienced in developing scalable web applications and tools, delivering structured code and efficient database management. Strong analytical and problem-solving skills, with a proven ability to collaborate effectively in team environments.",
			btnEmail: "Email Me",
			btnWa: "WhatsApp",
			btnDownload: "Download CV",
		},
		sections: { skills: "Technical Skills", expWork: "Work Experience", expOrg: "Organizational Experience", proj: "Projects (Thesis)", edu: "Education", contact: "Let's Collaborate" },
		experience: {
			work: [
				{
					period: "Sep 2023 - Jan 2024",
					role: "Lecturer Assistant",
					place: "Maranatha Christian University",
					points: ["Basic Programming - Supported students in fundamental coding.", "Advanced Database - Assisted developing scalable database management."],
				},
			],
			org: [
				{
					period: "Feb 2023 - Jan 2024",
					role: "Academic Division Member",
					place: "Faculty Student Senate (SEMAFIT)",
					points: [
						"Actively executed and supported the implementation of the Academic Division's core programs to ensure targeted goals were met.",
						"Collaborated cross-functionally with other divisions to assist in organizing and executing various student organization events.",
						"Administrative Coordinator, New Student Orientation 2023 (INTEGER 2023).",
					],
				},
			],
		},
		projects: [
			{
				title: "CODE-CITE WEB",
				year: "2026",
				desc: "Development of a Web-Based Code Citation Application. Expertise in Web Development, Data Processing, and Software Testing.",
				tags: ["Web Dev", "Data Processing", "Software Testing"],
			},
			{
				title: "CODE-CITE EXTENSION",
				year: "2026",
				desc: "Development of a Visual Studio Code Plugin for Structured Code Citation. Expertise in Plugin Development, Software Engineering, and Usability Evaluation.",
				tags: ["VS Code", "Plugin Dev", "Software Engineering"],
			},
		],
		education: {
			degree: "Bachelor of Computer: Informatics Engineering",
			expertise: "Expertise: Backend Development & Prompt Engineering",
			gpaText: "Latest GPA",
		},
		contactForm: {
			desc: "Interested in working together or have any questions? Feel free to send a message using the form below.",
			nameLabel: "Full Name",
			emailLabel: "Email",
			msgLabel: "Message",
			btnIdle: "Send Message",
			btnSubmitting: "Sending...",
			btnSuccess: "Message Sent!",
		},
	},
};
// ==========================================================

// --- KOMPONEN PEMBANTU ---

// 1. Komponen Animasi Fade-in Sederhana (Native API)
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
	const [isVisible, setVisible] = useState(false);
	const domRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						// Stop observing after it's visible so it doesn't animate repeatedly
						if (domRef.current) observer.unobserve(domRef.current);
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
		);

		if (domRef.current) observer.observe(domRef.current);
		return () => {
			if (domRef.current) observer.unobserve(domRef.current);
		};
	}, []);

	return (
		<div
			ref={domRef}
			className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
			{children}
		</div>
	);
};

// 2. Komponen Garis Pembatas (Tech Gradient Divider)
const TechDivider = ({ theme }: { theme: "light" | "dark" }) => (
	<div className="flex items-center justify-center py-6 opacity-60">
		<div className={`h-px flex-1 bg-gradient-to-r ${theme === "dark" ? "from-transparent to-slate-700" : "from-transparent to-slate-300"}`}></div>
		<div className={`mx-4 w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "bg-blue-400"}`}></div>
		<div className={`h-px flex-1 bg-gradient-to-l ${theme === "dark" ? "from-transparent to-slate-700" : "from-transparent to-slate-300"}`}></div>
	</div>
);

// --- KOMPONEN UTAMA ---
const App = () => {
	const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [lang, setLang] = useState<"id" | "en">("id");
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	// Variabel untuk mengakses bahasa yang sedang aktif
	const t = portofolioData[lang];

	// Helper function untuk mengganti class berdasarkan tema
	const c = (lightClass: string, darkClass: string) => (theme === "dark" ? darkClass : lightClass);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormStatus("submitting");
		const myForm = e.currentTarget;
		const formData = new FormData(myForm);

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData as any).toString(),
		})
			.then(() => setFormStatus("success"))
			.catch((error) => alert(error));
	};

	// Helper untuk render icon skill
	const getIcon = (name: string) => {
		switch (name) {
			case "server":
				return <Server />;
			case "layout":
				return <Layout />;
			case "smartphone":
				return <Smartphone />;
			case "database":
				return <Database />;
			case "wrench":
				return <Wrench />;
			default:
				return <Server />;
		}
	};

	return (
		<div className={`min-h-screen font-sans selection:bg-blue-300 scroll-smooth transition-colors duration-300 overflow-x-hidden ${c("bg-slate-50 text-slate-800", "bg-slate-900 text-slate-200")}`}>
			{/* NAVBAR STICKY */}
			<nav className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b transition-colors duration-300 ${c("bg-white/80 border-slate-200 shadow-sm", "bg-slate-950/80 border-slate-800")}`}>
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					{/* LOGO: KVINOWN + Ikon Terminal */}
					<div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${c("text-slate-900", "text-white")}`}>
						<Terminal
							size={24}
							className="text-blue-500"
						/>
						<span>kvinown</span>
					</div>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-8 text-sm font-medium">
						<div className={`flex gap-6 ${c("text-slate-600", "text-slate-300")}`}>
							<a
								href="#experience"
								className="hover:text-blue-500 transition-colors">
								{t.nav.exp}
							</a>
							<a
								href="#projects"
								className="hover:text-blue-500 transition-colors">
								{t.nav.proj}
							</a>
							<a
								href="#skills"
								className="hover:text-blue-500 transition-colors">
								{t.nav.skills}
							</a>
							<a
								href="#contact"
								className="hover:text-blue-500 transition-colors">
								{t.nav.contact}
							</a>
						</div>

						{/* Toggles */}
						<div className="flex items-center gap-4 pl-6 border-l border-slate-300 dark:border-slate-700">
							<button
								onClick={() => setLang(lang === "id" ? "en" : "id")}
								className={`flex items-center gap-1 hover:text-blue-500 transition-colors ${c("text-slate-600", "text-slate-300")}`}>
								<Languages size={18} /> <span className="uppercase">{lang}</span>
							</button>
							<button
								onClick={() => setTheme(theme === "light" ? "dark" : "light")}
								className={`hover:text-blue-500 transition-colors ${c("text-slate-600", "text-slate-300")}`}>
								{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
							</button>
						</div>
					</div>

					{/* Mobile Menu Toggle */}
					<div className="md:hidden flex items-center gap-4">
						<button
							onClick={() => setTheme(theme === "light" ? "dark" : "light")}
							className={c("text-slate-600", "text-slate-300")}>
							{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
						</button>
						<button
							onClick={() => setLang(lang === "id" ? "en" : "id")}
							className={`flex items-center gap-1 ${c("text-slate-600", "text-slate-300")}`}>
							<span className="uppercase text-sm font-bold">{lang}</span>
						</button>
						<button
							className={c("text-slate-800", "text-slate-200")}
							onClick={() => setIsNavOpen(!isNavOpen)}>
							{isNavOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Nav Menu dengan Smooth Transition */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						isNavOpen ? "max-h-96 opacity-100 border-b" : "max-h-0 opacity-0 border-transparent"
					} ${c("bg-white border-slate-200 text-slate-700", "bg-slate-900 border-slate-800 text-slate-300")}`}>
					<div className="px-6 py-4 flex flex-col gap-4 shadow-xl">
						<a
							href="#experience"
							onClick={() => setIsNavOpen(false)}
							className="hover:text-blue-500 font-medium">
							{t.nav.exp}
						</a>
						<a
							href="#projects"
							onClick={() => setIsNavOpen(false)}
							className="hover:text-blue-500 font-medium">
							{t.nav.proj}
						</a>
						<a
							href="#skills"
							onClick={() => setIsNavOpen(false)}
							className="hover:text-blue-500 font-medium">
							{t.nav.skills}
						</a>
						<a
							href="#contact"
							onClick={() => setIsNavOpen(false)}
							className="hover:text-blue-500 font-medium">
							{t.nav.contact}
						</a>
					</div>
				</div>
			</nav>

			{/* HEADER / HERO SECTION */}
			<header className={`relative overflow-hidden min-h-screen flex items-center pt-24 pb-12 transition-colors duration-300 ${c("bg-blue-50", "bg-slate-900")}`}>
				<div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] ${c("from-blue-300 via-transparent to-transparent", "from-blue-500 via-slate-800 to-transparent")}`}></div>

				<div className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
					<FadeInSection>
						{/* CONTAINER UTAMA HERO (KOLOM) */}
						<div className="flex flex-col gap-12 md:gap-16 w-full">
							{/* TOP SECTION: TEKS & FOTO SEJAJAR */}
							<div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-12 md:gap-8 w-full">
								{/* Kiri: Teks & Tombol */}
								<div className="max-w-2xl flex-1 flex flex-col justify-center">
									<h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-4 ${c("text-slate-900", "text-white")}`}>Kevin Owen</h1>
									<h2 className="text-xl md:text-2xl text-blue-500 font-bold mb-6">{t.hero.role}</h2>
									<p className={`text-lg md:text-xl leading-relaxed mb-8 ${c("text-slate-600", "text-slate-300")}`}>{t.hero.desc}</p>

									{/* BUTTONS */}
									<div className="flex flex-wrap gap-4 text-sm">
										<a
											href={`mailto:${portofolioData.contacts.email}`}
											className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-blue-600/30">
											<Mail size={18} /> {t.hero.btnEmail}
										</a>
										<a
											href={`https://wa.me/${portofolioData.contacts.phoneWa}`}
											target="_blank"
											rel="noreferrer"
											className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-green-600/30">
											<Phone size={18} /> {t.hero.btnWa}
										</a>
										<a
											href={`/${portofolioData.contacts.cvFileName}`}
											download
											className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors border-2 ${c("border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white", "border-slate-300 text-slate-300 hover:bg-white hover:text-slate-900")}`}>
											<Download size={18} /> {t.hero.btnDownload}
										</a>
									</div>
								</div>

								{/* Kanan: Foto Profil */}
								<div className="flex-shrink-0 relative group mx-auto md:mx-0 flex items-center justify-center">
									{/* Efek Glow di belakang foto */}
									<div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

									{/* Box container foto profil (Rasio 3:4 agar tidak terlalu panjang ke bawah) */}
									<div className={`relative w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 transition-transform duration-500 group-hover:-translate-y-2 ${c("border-white", "border-slate-800")}`}>
										{/* FOTO: Pastikan Anda mem-flip/mirror fotonya secara manual di perangkat Anda */}
										<img
											src="/profil.jpg"
											alt="Kevin Owen"
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>

										{/* Shadow inset halus di dalam frame */}
										<div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
									</div>
								</div>
							</div>

							{/* BOTTOM SECTION: KONTAK HORIZONTAL PENUH */}
							<div className={`pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-6 w-full ${c("border-slate-300 text-slate-600", "border-slate-700 text-slate-400")}`}>
								{/* Kiri: Lokasi & Telepon */}
								<div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm font-medium">
									<div className="flex items-center gap-3">
										<MapPin
											size={18}
											className="text-blue-500"
										/>{" "}
										Bandung, Indonesia
									</div>
									<div className="flex items-center gap-3">
										<Phone
											size={18}
											className="text-blue-500"
										/>{" "}
										{portofolioData.contacts.phoneDisplay}
									</div>
								</div>

								{/* Kanan: Social Icons */}
								<div className="flex items-center justify-center gap-6">
									<a
										href={portofolioData.contacts.github}
										target="_blank"
										rel="noreferrer"
										className="hover:text-blue-500 transition-colors">
										<GithubIcon size={24} />
									</a>
									<a
										href={portofolioData.contacts.linkedin}
										target="_blank"
										rel="noreferrer"
										className="hover:text-blue-500 transition-colors">
										<LinkedinIcon size={24} />
									</a>
									<a
										href={portofolioData.contacts.instagram}
										target="_blank"
										rel="noreferrer"
										className="hover:text-blue-500 transition-colors">
										<InstagramIcon size={24} />
									</a>
									<a
										href={portofolioData.contacts.web}
										className="hover:text-blue-500 transition-colors">
										<Globe size={24} />
									</a>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</header>

			{/* MAIN CONTENT WITH SECTIONS & DIVIDERS */}
			<main className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-16 md:gap-24">
				{/* SKILLS SECTION (BARU: Bentuk Badge/Pil) */}
				<FadeInSection>
					<section id="skills">
						<h3 className={`text-3xl font-bold mb-10 flex items-center gap-2 ${c("text-slate-900", "text-white")}`}>{t.sections.skills}</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{portofolioData.skills.map((skill) => (
								// Kartu diatur menjadi flex-col dan h-full agar rapi
								<div
									key={skill.id}
									className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
									<div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${c("bg-blue-50 text-blue-600", "bg-slate-700 text-blue-400")}`}>{getIcon(skill.icon)}</div>
									<h4 className={`text-lg font-bold mb-6 ${c("text-slate-900", "text-white")}`}>{skill.title}</h4>

									{/* Container Item Badge/Pil yang didorong ke bawah (mt-auto) */}
									<div className="flex flex-wrap gap-2.5 mt-auto">
										{skill.items.map((item, idx) => (
											<span
												key={idx}
												className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${c("bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300", "bg-slate-900/50 border-slate-700 text-blue-400 hover:bg-slate-800 hover:border-blue-500")}`}>
												{item}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>
				</FadeInSection>

				{/* PEMBATAS */}
				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* EXPERIENCE SECTION (SPLIT 2 COLUMNS) */}
				<FadeInSection>
					<section id="experience">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
							{/* Kolom Kiri: Pengalaman Kerja */}
							<div>
								<h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${c("text-slate-900", "text-white")}`}>
									<Briefcase className="text-blue-500" /> {t.sections.expWork}
								</h3>
								<div className={`space-y-10 border-l-2 pl-6 md:pl-8 ml-3 ${c("border-blue-200", "border-slate-700")}`}>
									{t.experience.work.map((exp, idx) => (
										<div
											key={idx}
											className="relative">
											<div className="absolute -left-[41px] md:-left-[49px] bg-blue-500 p-2 rounded-full border-4 border-slate-50 dark:border-slate-900">
												<Server
													size={14}
													className="text-white"
												/>
											</div>
											<div className={`p-6 rounded-xl shadow-sm border transition-colors hover:border-blue-500/50 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
												<span className="text-sm font-bold text-blue-500 mb-1 block">{exp.period}</span>
												<h4 className={`text-xl font-bold mb-1 ${c("text-slate-900", "text-white")}`}>{exp.role}</h4>
												<p className={`font-medium mb-4 ${c("text-slate-600", "text-slate-400")}`}>{exp.place}</p>
												<ul className="space-y-2">
													{exp.points.map((point, pIdx) => (
														<li
															key={pIdx}
															className={`flex items-start gap-2 text-sm leading-relaxed ${c("text-slate-600", "text-slate-300")}`}>
															<ChevronRight
																size={16}
																className="text-blue-500 shrink-0 mt-0.5"
															/>
															<span>{point}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Kolom Kanan: Pengalaman Organisasi */}
							<div>
								<h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${c("text-slate-900", "text-white")}`}>
									<Users className="text-blue-500" /> {t.sections.expOrg}
								</h3>
								<div className={`space-y-10 border-l-2 pl-6 md:pl-8 ml-3 ${c("border-blue-200", "border-slate-700")}`}>
									{t.experience.org.map((exp, idx) => (
										<div
											key={idx}
											className="relative">
											<div className="absolute -left-[41px] md:-left-[49px] bg-slate-400 dark:bg-slate-600 p-2 rounded-full border-4 border-slate-50 dark:border-slate-900">
												<Layout
													size={14}
													className="text-white"
												/>
											</div>
											<div className={`p-6 rounded-xl shadow-sm border transition-colors hover:border-slate-400/50 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
												<span className={`text-sm font-bold mb-1 block ${c("text-slate-500", "text-slate-400")}`}>{exp.period}</span>
												<h4 className={`text-xl font-bold mb-1 ${c("text-slate-900", "text-white")}`}>{exp.role}</h4>
												<p className={`font-medium mb-4 ${c("text-slate-600", "text-slate-400")}`}>{exp.place}</p>
												<ul className="space-y-2">
													{exp.points.map((point, pIdx) => (
														<li
															key={pIdx}
															className={`flex items-start gap-2 text-sm leading-relaxed ${c("text-slate-600", "text-slate-300")}`}>
															<ChevronRight
																size={16}
																className="text-blue-500 shrink-0 mt-0.5"
															/>
															<span>{point}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>
				</FadeInSection>

				{/* PEMBATAS */}
				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* PROJECTS SECTION */}
				<FadeInSection>
					<section id="projects">
						<h3 className={`text-3xl font-bold mb-10 ${c("text-slate-900", "text-white")}`}>{t.sections.proj}</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{t.projects.map((proj, idx) => (
								<div
									key={idx}
									className={`rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
									<div className={`h-48 flex items-center justify-center border-b transition-colors ${c("bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 group-hover:from-blue-100", "bg-slate-700/50 border-slate-600")}`}>
										{idx === 0 ? (
											<Globe
												size={64}
												className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
											/>
										) : (
											<Layout
												size={64}
												className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
											/>
										)}
									</div>
									<div className="p-8 flex-1 flex flex-col">
										<div className="flex justify-between items-start mb-4">
											<h4 className={`text-xl font-bold ${c("text-slate-900", "text-white")}`}>{proj.title}</h4>
											<span className={`text-xs px-3 py-1 rounded-full font-bold ${c("bg-blue-100 text-blue-700", "bg-blue-900/50 text-blue-400")}`}>{proj.year}</span>
										</div>
										<p className={`mb-8 leading-relaxed flex-1 ${c("text-slate-600", "text-slate-300")}`}>{proj.desc}</p>
										<div className="flex flex-wrap gap-2">
											{proj.tags.map((tag, tIdx) => (
												<span
													key={tIdx}
													className={`text-xs px-3 py-1.5 rounded-lg font-medium ${c("bg-slate-100 text-slate-600", "bg-slate-700/50 text-slate-300")}`}>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</FadeInSection>

				{/* PEMBATAS */}
				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* EDUCATION */}
				<FadeInSection>
					<section
						id="education"
						className={`rounded-3xl p-8 md:p-12 border shadow-sm transition-colors hover:border-blue-500/30 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
						<div className="md:flex justify-between items-center">
							<div>
								<h3 className={`text-2xl font-bold mb-4 ${c("text-slate-900", "text-white")}`}>{t.sections.edu}</h3>
								<h4 className="text-xl text-blue-500 font-bold mb-1">Maranatha Christian University</h4>
								<p className={`font-medium ${c("text-slate-700", "text-slate-200")}`}>{t.education.degree}</p>
								<p className={`text-sm mt-2 ${c("text-slate-500", "text-slate-400")}`}>{t.education.expertise}</p>
							</div>
							<div className="mt-8 md:mt-0 text-left md:text-right">
								<div className={`inline-block px-5 py-3 rounded-xl border ${c("bg-slate-50 border-slate-200", "bg-slate-900/50 border-slate-600")}`}>
									<p className={`text-sm font-bold uppercase tracking-wider mb-1 ${c("text-slate-500", "text-slate-400")}`}>{t.education.gpaText}</p>
									<p className={`text-3xl font-extrabold ${c("text-slate-900", "text-white")}`}>
										3.73<span className={`text-xl font-medium ${c("text-slate-400", "text-slate-500")}`}>/4.00</span>
									</p>
								</div>
								<p className={`font-bold mt-4 ${c("text-slate-500", "text-slate-400")}`}>2022 - 2026</p>
							</div>
						</div>
					</section>
				</FadeInSection>

				{/* PEMBATAS */}
				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* CONTACT SECTION */}
				<FadeInSection>
					<section
						id="contact"
						className="max-w-2xl mx-auto text-center pb-10">
						<h3 className={`text-4xl font-extrabold mb-4 ${c("text-slate-900", "text-white")}`}>{t.sections.contact}</h3>
						<p className={`text-lg mb-10 ${c("text-slate-600", "text-slate-400")}`}>{t.contactForm.desc}</p>

						<form
							name="contact"
							method="POST"
							data-netlify="true"
							onSubmit={handleSubmit}
							className={`p-8 md:p-10 rounded-3xl shadow-lg border text-left ${c("bg-white border-slate-200 shadow-slate-200/50", "bg-slate-800/80 border-slate-700 shadow-none")}`}>
							<input
								type="hidden"
								name="form-name"
								value="contact"
							/>

							<div className="space-y-6">
								<div>
									<label
										htmlFor="name"
										className={`block text-sm font-bold mb-2 ${c("text-slate-700", "text-slate-300")}`}>
										{t.contactForm.nameLabel}
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${c("bg-slate-50 border-slate-200 text-slate-900", "bg-slate-900/50 border-slate-600 text-white")}`}
										placeholder="John Doe"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className={`block text-sm font-bold mb-2 ${c("text-slate-700", "text-slate-300")}`}>
										{t.contactForm.emailLabel}
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${c("bg-slate-50 border-slate-200 text-slate-900", "bg-slate-900/50 border-slate-600 text-white")}`}
										placeholder="john@example.com"
									/>
								</div>
								<div>
									<label
										htmlFor="message"
										className={`block text-sm font-bold mb-2 ${c("text-slate-700", "text-slate-300")}`}>
										{t.contactForm.msgLabel}
									</label>
									<textarea
										id="message"
										name="message"
										rows={5}
										required
										className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${c("bg-slate-50 border-slate-200 text-slate-900", "bg-slate-900/50 border-slate-600 text-white")}`}
										placeholder="Hello Kevin..."></textarea>
								</div>
								<button
									type="submit"
									disabled={formStatus === "submitting" || formStatus === "success"}
									className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 mt-2">
									{formStatus === "idle" && (
										<>
											<Send size={20} /> {t.contactForm.btnIdle}
										</>
									)}
									{formStatus === "submitting" && t.contactForm.btnSubmitting}
									{formStatus === "success" && t.contactForm.btnSuccess}
								</button>
							</div>
						</form>
					</section>
				</FadeInSection>
			</main>

			{/* FOOTER */}
			<footer className={`py-8 text-center border-t transition-colors duration-300 mt-10 ${c("bg-white border-slate-200 text-slate-500", "bg-slate-950 border-slate-800 text-slate-400")}`}>
				<p className="font-medium">© {new Date().getFullYear()} Kevin Owen. Built with React & Tailwind CSS.</p>
			</footer>
		</div>
	);
};

// Custom SVG Icon untuk GitHub
const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.23 4.2 4.2 0 0 0-.13-3.22s-1.12-.36-3.6 1.32a12.4 12.4 0 0 0-6.5 0C8.12 1.36 7 1.72 7 1.72a4.2 4.2 0 0 0-.13 3.22A4.6 4.6 0 0 0 5.5 8.16c0 5.58 3.35 6.64 6.5 7.02a4.8 4.8 0 0 0-1 3.02V22"></path>
		<path d="M9 20.5 5 19.5"></path>
	</svg>
);

// Custom SVG Icon untuk LinkedIn
const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
		<rect
			width="4"
			height="12"
			x="2"
			y="9"></rect>
		<circle
			cx="4"
			cy="4"
			r="2"></circle>
	</svg>
);

// Custom SVG Icon untuk Instagram
const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<rect
			width="20"
			height="20"
			x="2"
			y="2"
			rx="5"
			ry="5"></rect>
		<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
		<line
			x1="17.5"
			x2="17.51"
			y1="6.5"
			y2="6.5"></line>
	</svg>
);

export default App;
