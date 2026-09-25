import React from 'react';
import { MapPin, Briefcase, GraduationCap, BrainCircuit } from 'lucide-react';
import { FadeInSection } from '../animations/FadeInSection';
import { TextAnimation } from '../animations/TextAnimation';

export const BentoGrid = ({ t, c, theme }: any) => {
	// The marquee items
	const techStack = ["React", "TypeScript", "Node.js", "Laravel", "Python", "MySQL", "PostgreSQL", "Flutter", "TailwindCSS", "Next.js", "Docker", "Git"];
	
	// Create gradient fade classes based on theme for the marquee
	const fadeClass = theme === "dark" 
		? "absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-black via-transparent to-black"
		: "absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-slate-900 via-transparent to-slate-900";

	return (
		<section className="w-full max-w-6xl mx-auto px-6 mb-16 relative z-10">
			<FadeInSection>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px]">
					
					{/* Box 1: Main Focus (Span 2 col, 2 row) */}
					<div className={`col-span-1 md:col-span-2 row-span-2 rounded-3xl p-8 md:p-10 flex flex-col justify-end relative overflow-hidden group ${c("bg-gradient-to-br from-blue-500 to-blue-700", "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700")}`}>
						<div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
							<BrainCircuit size={160} className="text-white" />
						</div>
						<h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 relative z-10 leading-tight">
							{t.bento?.focusTitle || "Focusing on Backend & AI Integration"}
						</h3>
						<p className="text-blue-100 font-medium relative z-10 text-lg">
							{t.bento?.focusDesc || "Building scalable, robust systems and exploring AI solutions to solve complex real-world problems."}
						</p>
					</div>

					{/* Box 2: Location (Span 1) */}
					<div className={`rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group ${c("bg-white border border-slate-200", "bg-slate-800/80 border border-slate-700")}`}>
						<div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
						<div className={`p-4 rounded-full mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 ${c("bg-blue-50 text-blue-600", "bg-slate-900/50 text-blue-400")}`}>
							<MapPin size={32} />
						</div>
						<h4 className={`font-extrabold text-xl ${c("text-slate-800", "text-white")}`}>{t.bento?.location || "Bandung"}</h4>
						<p className={`text-sm font-medium ${c("text-slate-500", "text-slate-400")}`}>{t.bento?.country || "Indonesia"}</p>
					</div>

					{/* Box 3: GPA / Education Stats (Span 1) */}
					<div className={`rounded-3xl p-6 flex flex-col items-center justify-center group ${c("bg-blue-50 border border-blue-100", "bg-slate-800/80 border border-slate-700")}`}>
						<GraduationCap size={32} className={`mb-3 group-hover:-rotate-12 transition-transform duration-300 ${c("text-blue-600", "text-blue-400")}`} />
						<h4 className={`font-extrabold text-4xl mb-1 ${c("text-slate-900", "text-white")}`}>3.73</h4>
						<p className={`text-xs font-bold uppercase tracking-wider ${c("text-blue-700", "text-blue-400")}`}>{t.bento?.gpaText || "GPA / 4.00"}</p>
					</div>

					{/* Box 4: Tech Stack Marquee (Span 2 cols) */}
					<div className={`col-span-1 md:col-span-2 rounded-3xl overflow-hidden flex flex-col justify-center relative ${c("bg-slate-900", "bg-black border border-slate-800")}`}>
						<div className={fadeClass}></div>
						
						<div className="flex gap-4 animate-marquee whitespace-nowrap pl-4 w-max">
							{/* Duplicate the array twice to ensure seamless infinite scroll */}
							{[...techStack, ...techStack, ...techStack].map((tech, idx) => (
								<span key={idx} className="px-6 py-3 rounded-2xl bg-white/10 text-white font-bold backdrop-blur-sm border border-white/10">
									{tech}
								</span>
							))}
						</div>
					</div>

					{/* Box 5: Availability (Span full width) */}
					<div className={`col-span-1 md:col-span-4 rounded-3xl p-6 md:p-8 flex items-center justify-between group cursor-pointer ${c("bg-white border border-slate-200 hover:border-blue-300 shadow-xl shadow-slate-200/50", "bg-slate-800/50 border border-slate-700 hover:border-blue-500")}`} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
						<div className="flex items-center gap-6">
							<div className="relative flex h-6 w-6 shrink-0">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-6 w-6 bg-green-500"></span>
							</div>
							<div>
								<h4 className={`text-xl md:text-2xl font-extrabold mb-1 group-hover:text-blue-500 transition-colors ${c("text-slate-900", "text-white")}`}>
									<TextAnimation text={t.bento?.available || "Available for New Opportunities"} />
								</h4>
								<p className={`font-medium text-sm md:text-base ${c("text-slate-500", "text-slate-400")}`}>
									{t.bento?.availableDesc || "Currently open for full-time roles, freelance, or interesting collaborations."}
								</p>
							</div>
						</div>
						<div className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${c("bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500", "bg-slate-900 text-slate-500 group-hover:bg-slate-700 group-hover:text-blue-400")}`}>
							<Briefcase size={32} />
						</div>
					</div>
					
				</div>
			</FadeInSection>
		</section>
	);
};
