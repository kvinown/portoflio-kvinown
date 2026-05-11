import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Server, Layout as LayoutIcon, Smartphone, Database, Wrench, ChevronRight, Send, Briefcase, Users, Download } from "lucide-react";
import { FadeInSection } from "../animations/FadeInSection";
import { TechDivider } from "../components/TechDivider";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../components/Icons";
import { TextAnimation } from "../animations/TextAnimation";

export const HomePage = ({ t, c, theme, portofolioData }: any) => {
	const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

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
			<header className={`relative overflow-hidden min-h-screen flex items-center pt-24 pb-12 transition-colors duration-300 ${c("bg-blue-50", "bg-slate-900")}`}>
				<div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] ${c("from-blue-300 via-transparent to-transparent", "from-blue-500 via-slate-800 to-transparent")}`}></div>
				<div className="max-w-6xl mx-auto px-6 relative z-10 w-full flex flex-col justify-center h-full">
					<FadeInSection>
						<div className="flex flex-col gap-12 md:gap-16 w-full">
							<div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-12 md:gap-8 w-full">
								<div className="max-w-2xl flex-1 flex flex-col justify-center">
									<h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-4 ${c("text-slate-900", "text-white")}`}>Kevin Owen</h1>
									<h2 className="text-xl md:text-2xl text-blue-500 font-bold mb-6 min-h-[1.5em]">
										<TextAnimation text={t.hero.role} />
									</h2>
									<p className={`text-lg md:text-xl leading-relaxed mb-8 ${c("text-slate-600", "text-slate-300")}`}>
										<TextAnimation text={t.hero.desc} />
									</p>
									<div className="flex flex-wrap gap-4 text-sm">
										<a
											href={`mailto:${portofolioData.contacts.email}`}
											className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-blue-600/30">
											<Mail size={18} /> <TextAnimation text={t.hero.btnEmail} />
										</a>
										<a
											href={`https://wa.me/${portofolioData.contacts.phoneWa}`}
											target="_blank"
											rel="noreferrer"
											className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-green-600/30">
											<Phone size={18} /> <TextAnimation text={t.hero.btnWa} />
										</a>
										<a
											href={`/${portofolioData.contacts.cvFileName}`}
											download
											className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors border-2 ${c("border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white", "border-slate-300 text-slate-300 hover:bg-white hover:text-slate-900")}`}>
											<Download size={18} /> <TextAnimation text={t.hero.btnDownload} />
										</a>
									</div>
								</div>
								<div className="flex-shrink-0 relative group mx-auto md:mx-0">
									<div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
									<div className={`relative w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 ${c("border-white", "border-slate-800")}`}>
										<img
											src="/profil.jpg"
											alt="Kevin Owen"
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
									</div>
								</div>
							</div>
							<div className={`pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-6 w-full ${c("border-slate-300 text-slate-600", "border-slate-700 text-slate-400")}`}>
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

			<main className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-16 md:gap-24">
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
							<div>
								<h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${c("text-slate-900", "text-white")}`}>
									<Briefcase className="text-blue-500" /> <TextAnimation text={t.sections.expWork} />
								</h3>
								<div className={`space-y-10 border-l-2 pl-6 md:pl-8 ml-3 ${c("border-blue-200", "border-slate-700")}`}>
									{t.experience.work.map((exp: any, idx: number) => (
										<div
											key={idx}
											className="relative">
											<div className={`absolute -left-[41px] md:-left-[49px] bg-blue-500 p-2 rounded-full border-4 ${c("border-slate-50", "border-slate-900")}`}>
												<Server
													size={14}
													className="text-white"
												/>
											</div>
											<div className={`p-6 rounded-xl border transition-colors hover:border-blue-500/50 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
												<span className="text-sm font-bold text-blue-500 mb-1 block">{exp.period}</span>
												<h4 className={`text-xl font-bold mb-1 ${c("text-slate-900", "text-white")}`}>
													<TextAnimation text={exp.role} />
												</h4>
												<p className={`font-medium mb-4 ${c("text-slate-600", "text-slate-400")}`}>{exp.place}</p>
												<ul className="space-y-2">
													{exp.points.map((point: string, pIdx: number) => (
														<li
															key={pIdx}
															className={`flex items-start gap-2 text-sm leading-relaxed ${c("text-slate-600", "text-slate-300")}`}>
															<ChevronRight
																size={16}
																className="text-blue-500 shrink-0 mt-0.5"
															/>
															<span>
																<TextAnimation text={point} />
															</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									))}
								</div>
							</div>
							<div>
								<h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${c("text-slate-900", "text-white")}`}>
									<Users className="text-blue-500" /> <TextAnimation text={t.sections.expOrg} />
								</h3>
								<div className={`space-y-10 border-l-2 pl-6 md:pl-8 ml-3 ${c("border-blue-200", "border-slate-700")}`}>
									{t.experience.org.map((exp: any, idx: number) => (
										<div
											key={idx}
											className="relative">
											<div className={`absolute -left-[41px] md:-left-[49px] bg-slate-400 p-2 rounded-full border-4 ${c("border-slate-50", "border-slate-900")}`}>
												<LayoutIcon
													size={14}
													className="text-white"
												/>
											</div>
											<div className={`p-6 rounded-xl border transition-colors hover:border-slate-400/50 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
												<span className={`text-sm font-bold mb-1 block ${c("text-slate-500", "text-slate-400")}`}>{exp.period}</span>
												<h4 className={`text-xl font-bold mb-1 ${c("text-slate-900", "text-white")}`}>
													<TextAnimation text={exp.role} />
												</h4>
												<p className={`font-medium mb-4 ${c("text-slate-600", "text-slate-400")}`}>{exp.place}</p>
												<ul className="space-y-2">
													{exp.points.map((point: string, pIdx: number) => (
														<li
															key={pIdx}
															className={`flex items-start gap-2 text-sm leading-relaxed ${c("text-slate-600", "text-slate-300")}`}>
															<ChevronRight
																size={16}
																className="text-blue-500 shrink-0 mt-0.5"
															/>
															<span>
																<TextAnimation text={point} />
															</span>
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

				<FadeInSection>
					<TechDivider theme={theme} />
				</FadeInSection>

				{/* PROJECTS */}
				<FadeInSection>
					<section id="projects">
						<h3 className={`text-3xl font-bold mb-10 ${c("text-slate-900", "text-white")}`}>
							<TextAnimation text={t.sections.proj} />
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{t.projects.map((proj: any, idx: number) => (
								<a
									key={idx}
									href={proj.githubUrl}
									target="_blank"
									rel="noreferrer"
									className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group flex flex-col ${c("bg-white border-slate-200 hover:border-blue-400", "bg-slate-800/80 border-slate-700 hover:border-blue-500")}`}>
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
								</a>
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
						className={`rounded-3xl p-8 md:p-12 border transition-colors hover:border-blue-500/30 ${c("bg-white border-slate-200", "bg-slate-800/80 border-slate-700")}`}>
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
								<div className={`inline-block px-5 py-3 rounded-xl border ${c("bg-slate-50 border-slate-200", "bg-slate-900/50 border-slate-600")}`}>
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
										<TextAnimation text={t.contactForm.nameLabel} />
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
										<TextAnimation text={t.contactForm.emailLabel} />
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
										<TextAnimation text={t.contactForm.msgLabel} />
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
		</>
	);
};
