import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Server, Layout as LayoutIcon, Smartphone, Database, Wrench, ChevronRight, Send, Briefcase, Users, Download, Award, Code2 } from "lucide-react";

// Import komponen pembantu dan animasi
import { FadeInSection } from "../animations/FadeInSection";
import { TechDivider } from "../components/TechDivider";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../components/Icons";
import { TextAnimation } from "../animations/TextAnimation";
import { CertificationModal } from "../components/CertificationModal";
import { ProjectModal } from "../components/ProjectModal";
import { CustomCursor } from "../components/CustomCursor";
import { BentoGrid } from "../components/BentoGrid";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { TilSection } from "../components/TilSection";

export const HomePage = ({ t, c, theme, portofolioData }: any) => {
	const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
	const [projectFilter, setProjectFilter] = useState("All");
	const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
	const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

	const filteredProjects = t.projects.filter((proj: any) => projectFilter === "All" || proj.category === projectFilter);

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

	const getIcon = (name: string) => {
		switch (name) {
			case "server":
				return <Server />;
			case "layout":
				return <LayoutIcon />;
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
		<>
			<CustomCursor />
			{/* HEADER / HERO SECTION DENGAN EFEK CAHAYA LOGIN */}
			<header id="hero" className={`relative overflow-hidden min-h-screen flex items-center pt-24 pb-12 transition-colors duration-300`}>
				{/* --- ANIMASI CAHAYA (GLOWING ORBS) --- */}
				<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
					{/* Cahaya Light Mode (Menyebar dari kanan atas ke seluruh layar) */}
					<div
						className={`absolute top-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-blue-400/20 rounded-full blur-[100px] transition-all duration-1000 ease-in-out origin-center ${
							theme === "light" ? "scale-100 opacity-100" : "scale-50 opacity-0"
						}`}></div>

					{/* Cahaya Dark Mode (Bisa diletakkan di kiri bawah agar menyilang) */}
					<div
						className={`absolute bottom-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-blue-600/10 rounded-full blur-[100px] transition-all duration-1000 ease-in-out origin-center ${
							theme === "dark" ? "scale-100 opacity-100" : "scale-50 opacity-0"
						}`}></div>
				</div>

				<div className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
					<FadeInSection>
						<div className="flex flex-col gap-12 md:gap-16 w-full">
							<div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-12 md:gap-8 w-full">
								{/* Kiri: Teks & Tombol */}
								<div className="max-w-2xl flex-1 flex flex-col justify-center">
									<h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight pb-2 ${c("text-slate-900", "text-white")}`}>
										Kevin Owen
									</h1>
									<h2 className="text-xl md:text-2xl text-blue-500 font-bold mb-6 min-h-[1.5em] flex items-center gap-3">
										<Code2 className="animate-pulse" size={28} />
										<TextAnimation text={t.hero.role} />
									</h2>
									<p className={`text-lg md:text-xl leading-relaxed mb-8 ${c("text-slate-600", "text-slate-300")}`}>
										<TextAnimation text={t.hero.desc} />
									</p>
									<div className="flex flex-wrap items-center gap-4 text-sm mb-8">
										<a
											href={`mailto:${portofolioData.contacts.email}`}
											className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
											<Mail size={18} /> <TextAnimation text={t.hero.btnEmail} />
										</a>
										<a
											href={`https://wa.me/${portofolioData.contacts.phoneWa}`}
											target="_blank"
											rel="noreferrer"
											className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-green-600/30 transition-all hover:scale-105">
											<Phone size={18} /> <TextAnimation text={t.hero.btnWa} />
										</a>
										<a
											href={`/${portofolioData.contacts.cvFileName}`}
											download
											className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all hover:scale-105 border-2 ${c("border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white", "border-slate-300 text-slate-300 hover:bg-white hover:text-slate-900")}`}>
											<Download size={18} /> <TextAnimation text={t.hero.btnDownload} />
										</a>
									</div>
									
									{/* Social Icons dipindah ke sini agar lebih clean */}
									<div className="flex items-center gap-6">
										<span className={`text-sm font-bold uppercase tracking-wider ${c("text-slate-400", "text-slate-500")}`}>Connect:</span>
										<a href={portofolioData.contacts.github} target="_blank" rel="noreferrer" className={`transition-all hover:scale-125 hover:text-blue-500 ${c("text-slate-600", "text-slate-400")}`}>
											<GithubIcon size={24} />
										</a>
										<a href={portofolioData.contacts.linkedin} target="_blank" rel="noreferrer" className={`transition-all hover:scale-125 hover:text-blue-500 ${c("text-slate-600", "text-slate-400")}`}>
											<LinkedinIcon size={24} />
										</a>
										<a href={portofolioData.contacts.instagram} target="_blank" rel="noreferrer" className={`transition-all hover:scale-125 hover:text-blue-500 ${c("text-slate-600", "text-slate-400")}`}>
											<InstagramIcon size={24} />
										</a>
										<a href={portofolioData.contacts.web} className={`transition-all hover:scale-125 hover:text-blue-500 ${c("text-slate-600", "text-slate-400")}`}>
											<Globe size={24} />
										</a>
									</div>
								</div>

								{/* Kanan: Foto Profil */}
								<div className="flex-shrink-0 relative group mx-auto md:mx-0">
									<div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
									
									{/* Floating Badge (Pemanis) */}
									<div className={`absolute -bottom-6 -left-6 z-20 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border animate-bounce-slow ${c("bg-white/80 border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
										<div className="flex items-center gap-3">
											<div className="p-2 bg-blue-500 text-white rounded-full">
												<Server size={20} />
											</div>
											<div>
												<p className={`text-xs font-bold uppercase ${c("text-slate-500", "text-slate-400")}`}>Specialist</p>
												<p className={`font-extrabold ${c("text-slate-900", "text-white")}`}>Backend System</p>
											</div>
										</div>
									</div>

									<div className={`relative w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 transition-colors duration-300 ${c("border-white", "border-slate-800")}`}>
										<img
											src="/profil.jpg"
											alt="Kevin Owen"
											loading="lazy"
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
									</div>
								</div>
							</div>
						</div>
					</FadeInSection>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24 relative z-10">
				
				{/* BENTO GRID (ABOUT / QUICK FACTS) */}
				<BentoGrid t={t} c={c} theme={theme} />

				{/* SKILLS */}
				<FadeInSection>
					<section id="skills">
						<h3 className={`text-3xl font-bold mb-10 flex items-center gap-2 ${c("text-slate-900", "text-white")}`}>
							<TextAnimation text={t.sections.skills} />
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{portofolioData.skills.map((skill: any) => (
								<div
									key={skill.id}
									className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
									<div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${c("bg-blue-50 text-blue-600", "bg-slate-700 text-blue-400")}`}>{getIcon(skill.icon)}</div>
									<h4 className={`text-lg font-bold mb-6 ${c("text-slate-900", "text-white")}`}>{skill.title}</h4>
									<div className="flex flex-wrap gap-2.5 mt-auto">
										{skill.items.map((item: string, idx: number) => (
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

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* EXPERIENCE */}
				<FadeInSection>
					<section id="experience">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
							<ExperienceTimeline
								items={t.experience.work}
								title={t.sections.expWork}
								icon={<Briefcase className="text-blue-500" />}
								c={c}
							/>
							<ExperienceTimeline
								items={t.experience.org}
								title={t.sections.expOrg}
								icon={<Users className="text-blue-500" />}
								c={c}
							/>
						</div>
					</section>
				</FadeInSection>

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* TIL SECTION (Hidden for now as requested)
				<TilSection t={t} c={c} />

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>
				*/}

				{/* PROJECTS */}
				<FadeInSection>
					<section id="projects">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
							<h3 className={`text-3xl font-bold ${c("text-slate-900", "text-white")}`}>
								<TextAnimation text={t.sections.proj} />
							</h3>
							
							{/* Project Filter */}
							<div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl border ${c("bg-slate-100 border-slate-200", "bg-slate-800/50 border-slate-700")}`}>
								{["All", "Frontend", "Backend", "Fullstack"].map((filter) => (
									<button
										key={filter}
										onClick={() => setProjectFilter(filter)}
										className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
											projectFilter === filter
												? c("bg-white text-blue-600 shadow-sm", "bg-slate-700 text-blue-400")
												: c("text-slate-500 hover:text-slate-700", "text-slate-400 hover:text-slate-200")
										}`}
									>
										{filter}
									</button>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{filteredProjects.map((proj: any, idx: number) => (
								<div
									key={idx}
									onClick={() => setSelectedProjectIndex(idx)}
									className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group flex flex-col ${c("bg-white border-slate-200 hover:border-blue-400", "bg-slate-800/80 border-slate-700 hover:border-blue-500")}`}>
									<div className={`h-48 flex items-center justify-center border-b transition-colors relative ${c("bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200", "bg-slate-700/50 border-slate-600")}`}>
										<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/50 p-2 rounded-full backdrop-blur-sm">
											<GithubIcon
												size={20}
												className="text-white"
											/>
										</div>
										{idx === 0 ? (
											<Globe
												size={64}
												className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
											/>
										) : (
											<LayoutIcon
												size={64}
												className="text-blue-400 group-hover:scale-110 transition-transform duration-300"
											/>
										)}
									</div>
									<div className="p-8 flex-1 flex flex-col">
										<div className="flex justify-between items-start mb-4">
											<h4 className={`text-xl font-bold group-hover:text-blue-500 transition-colors ${c("text-slate-900", "text-white")}`}>
												<TextAnimation text={proj.title} />
											</h4>
											<span className={`text-xs px-3 py-1 rounded-full font-bold ${c("bg-blue-100 text-blue-700", "bg-blue-900/50 text-blue-400")}`}>{proj.year}</span>
										</div>
										<p className={`mb-8 leading-relaxed flex-1 ${c("text-slate-600", "text-slate-300")}`}>
											<TextAnimation text={proj.desc} />
										</p>
										<div className="flex flex-wrap gap-2">
											{proj.tags.map((tag: string, tIdx: number) => (
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

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* DIGITAL PRODUCTS (COMING SOON) */}
				<FadeInSection>
					<section id="products" className="relative group">
						<div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-3xl"></div>
						<div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
							<div className="max-w-2xl">
								<div className="flex items-center gap-3 mb-4">
									<div className={`p-2 rounded-lg ${c("bg-blue-100 text-blue-600", "bg-blue-900/50 text-blue-400")}`}>
										<LayoutIcon size={24} />
									</div>
									<h3 className={`text-3xl font-bold ${c("text-slate-900", "text-white")}`}>
										<TextAnimation text={t.sections.products} />
									</h3>
								</div>
								<p className={`text-lg leading-relaxed ${c("text-slate-600", "text-slate-400")}`}>
									<TextAnimation text={t.productsDesc} />
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{t.productsList?.map((product: any, idx: number) => (
								<div key={idx} className={`relative overflow-hidden rounded-3xl border transition-all duration-300 flex flex-col ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
									<div className="absolute top-4 right-4 z-20">
										<span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm ${c("bg-white/90 text-blue-600 border border-blue-100", "bg-slate-900/80 text-blue-400 border border-blue-900")}`}>
											{product.status}
										</span>
									</div>
									<div className={`h-56 relative flex items-center justify-center overflow-hidden border-b ${c("bg-slate-100 border-slate-200", "bg-slate-900 border-slate-700")}`}>
										{/* Fake skeleton UI for template */}
										<div className={`w-3/4 h-3/4 flex ${idx % 2 === 0 ? 'flex-col' : ''} gap-3 opacity-30 blur-[2px]`}>
											{idx % 2 === 0 ? (
												<>
													<div className="w-full h-12 bg-slate-400 rounded-xl"></div>
													<div className="w-2/3 h-8 bg-slate-400 rounded-lg"></div>
													<div className="flex gap-2 h-full">
														<div className="w-1/2 h-full bg-slate-400 rounded-xl"></div>
														<div className="w-1/2 h-full bg-slate-400 rounded-xl"></div>
													</div>
												</>
											) : (
												<>
													<div className="w-1/3 h-full bg-slate-400 rounded-xl"></div>
													<div className="w-2/3 h-full flex flex-col gap-3">
														<div className="w-full h-1/2 bg-slate-400 rounded-xl"></div>
														<div className="w-3/4 h-1/4 bg-slate-400 rounded-lg"></div>
													</div>
												</>
											)}
										</div>
										<div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
									</div>
									<div className="p-8 flex-1 flex flex-col justify-between">
										<div>
											<h4 className={`text-2xl font-bold mb-3 ${c("text-slate-900", "text-white")}`}>
												{product.title}
											</h4>
											<p className={`mb-6 leading-relaxed ${c("text-slate-600", "text-slate-400")}`}>
												{product.desc}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
				</FadeInSection>

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* EDUCATION */}
				<FadeInSection>
					<section
						id="education"
						className={`rounded-3xl p-8 md:p-12 border transition-colors duration-300 hover:border-blue-500/30 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
						<div className="md:flex justify-between items-center">
							<div>
								<h3 className={`text-2xl font-bold mb-4 ${c("text-slate-900", "text-white")}`}>
									<TextAnimation text={t.sections.edu} />
								</h3>
								<h4 className="text-xl text-blue-500 font-bold mb-1">Maranatha Christian University</h4>
								<p className={`font-medium ${c("text-slate-700", "text-slate-200")}`}>
									<TextAnimation text={t.education.degree} />
								</p>
								<p className={`text-sm mt-2 ${c("text-slate-500", "text-slate-400")}`}>
									<TextAnimation text={t.education.expertise} />
								</p>
							</div>
							<div className="mt-8 md:mt-0 text-left md:text-right">
								<div className={`inline-block px-5 py-3 rounded-xl border transition-colors duration-300 ${c("bg-slate-50 border-slate-200", "bg-slate-900/50 border-slate-600")}`}>
									<p className={`text-sm font-bold uppercase tracking-wider mb-1 ${c("text-slate-500", "text-slate-400")}`}>
										<TextAnimation text={t.education.gpaText} />
									</p>
									<p className={`text-3xl font-extrabold ${c("text-slate-900", "text-white")}`}>
										3.73<span className={`text-xl font-medium ${c("text-slate-400", "text-slate-500")}`}>/4.00</span>
									</p>
								</div>
								<p className={`font-bold mt-4 ${c("text-slate-500", "text-slate-400")}`}>2022 - 2026</p>
							</div>
						</div>
					</section>
				</FadeInSection>

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* CERTIFICATIONS */}
				<FadeInSection>
					<section id="certifications" className="mt-24">
						<h3 className={`text-3xl font-bold mb-10 ${c("text-slate-900", "text-white")}`}>
							<TextAnimation text={t.sections.cert} />
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{t.certifications?.map((cert: any, idx: number) => (
								<div 
									key={idx}
									onClick={() => setSelectedCertIndex(idx)}
									className={`cursor-pointer rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center text-center gap-6 ${c("bg-white border-slate-200 hover:border-blue-400", "bg-slate-800/80 border-slate-700 hover:border-blue-500")}`}
								>
									<div className={`p-4 rounded-full ${c("bg-blue-50 text-blue-600", "bg-slate-700 text-blue-400")}`}>
										<Award size={48} />
									</div>
									<div>
										<h4 className={`text-xl font-bold mb-2 ${c("text-slate-900", "text-white")}`}>
											{cert.title}
										</h4>
										<p className={`font-medium ${c("text-blue-600", "text-blue-400")}`}>
											{cert.issuer}
										</p>
										<p className={`text-sm mt-2 ${c("text-slate-500", "text-slate-400")}`}>
											{cert.date}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				</FadeInSection>

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* CONTACT */}
				<FadeInSection>
					<section
						id="contact"
						className="max-w-2xl mx-auto text-center pb-10">
						<h3 className={`text-4xl font-extrabold mb-4 ${c("text-slate-900", "text-white")}`}>
							<TextAnimation text={t.sections.contact} />
						</h3>
						<p className={`text-lg mb-10 ${c("text-slate-600", "text-slate-400")}`}>
							<TextAnimation text={t.contactForm.desc} />
						</p>
						<form
							name="contact"
							method="POST"
							data-netlify="true"
							onSubmit={handleSubmit}
							className={`p-8 md:p-10 rounded-3xl shadow-lg border text-left transition-colors duration-300 ${c("bg-white border-slate-200 shadow-slate-200/50", "bg-slate-800/80 border-slate-700 shadow-none")}`}>
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
										<TextAnimation text={t.contactForm.nameLabel} />
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300 ${c("bg-slate-50 border-slate-200 text-slate-900", "bg-slate-900/50 border-slate-600 text-white")}`}
										placeholder="John Doe"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className={`block text-sm font-bold mb-2 ${c("text-slate-700", "text-slate-300")}`}>
										<TextAnimation text={t.contactForm.emailLabel} />
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300 ${c("bg-slate-50 border-slate-200 text-slate-900", "bg-slate-900/50 border-slate-600 text-white")}`}
										placeholder="john@example.com"
									/>
								</div>
								<div>
									<label
										htmlFor="message"
										className={`block text-sm font-bold mb-2 ${c("text-slate-700", "text-slate-300")}`}>
										<TextAnimation text={t.contactForm.msgLabel} />
									</label>
									<textarea
										id="message"
										name="message"
										rows={5}
										required
										className={`w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300 resize-none ${c("bg-slate-50 border-slate-200 text-slate-900", "bg-slate-900/50 border-slate-600 text-white")}`}
										placeholder="Hello Kevin..."></textarea>
								</div>
								<button
									type="submit"
									disabled={formStatus === "submitting" || formStatus === "success"}
									className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center gap-2 disabled:opacity-70 mt-2">
									{formStatus === "idle" && (
										<>
											<Send size={20} /> <TextAnimation text={t.contactForm.btnIdle} />
										</>
									)}
									{formStatus === "submitting" && <TextAnimation text={t.contactForm.btnSubmitting} />}
									{formStatus === "success" && <TextAnimation text={t.contactForm.btnSuccess} />}
								</button>
							</div>
						</form>
					</section>
				</FadeInSection>
			</main>
			
			{/* Modals */}
			<CertificationModal 
				cert={selectedCertIndex !== null ? t.certifications[selectedCertIndex] : null} 
				isOpen={selectedCertIndex !== null} 
				onClose={() => setSelectedCertIndex(null)} 
				onNext={selectedCertIndex !== null && selectedCertIndex < t.certifications.length - 1 ? () => setSelectedCertIndex(selectedCertIndex + 1) : undefined}
				onPrev={selectedCertIndex !== null && selectedCertIndex > 0 ? () => setSelectedCertIndex(selectedCertIndex - 1) : undefined}
				c={c} 
			/>

			<ProjectModal 
				project={selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null} 
				isOpen={selectedProjectIndex !== null} 
				onClose={() => setSelectedProjectIndex(null)} 
				onNext={selectedProjectIndex !== null && selectedProjectIndex < filteredProjects.length - 1 ? () => setSelectedProjectIndex(selectedProjectIndex + 1) : undefined}
				onPrev={selectedProjectIndex !== null && selectedProjectIndex > 0 ? () => setSelectedProjectIndex(selectedProjectIndex - 1) : undefined}
				c={c} 
				t={t}
			/>
		</>
	);
};
