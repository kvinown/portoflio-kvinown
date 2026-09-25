import React from "react";
import { X, ExternalLink, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { TextAnimation } from "../animations/TextAnimation";

export const ProjectModal = ({ project, isOpen, onClose, onNext, onPrev, c, t }: any) => {
	if (!isOpen || !project) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
			<div 
				className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
				onClick={onClose}
			></div>

			{/* Navigation Arrows (Fixed to screen edges) */}
			{onPrev && (
				<button 
					onClick={(e) => { e.stopPropagation(); onPrev(); }}
					className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[60] p-3 md:p-4 rounded-full shadow-2xl border-2 transition-all hover:scale-110 ${c("bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600", "bg-slate-800 border-slate-600 text-slate-300 hover:text-blue-400 hover:border-blue-400")}`}
					aria-label="Previous"
				>
					<ChevronLeft size={28} strokeWidth={2.5} />
				</button>
			)}
			{onNext && (
				<button 
					onClick={(e) => { e.stopPropagation(); onNext(); }}
					className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[60] p-3 md:p-4 rounded-full shadow-2xl border-2 transition-all hover:scale-110 ${c("bg-white border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600", "bg-slate-800 border-slate-600 text-slate-300 hover:text-blue-400 hover:border-blue-400")}`}
					aria-label="Next"
				>
					<ChevronRight size={28} strokeWidth={2.5} />
				</button>
			)}
			
			<div className={`relative w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all transform animate-roll-in ${c("bg-white border-slate-200", "bg-slate-900 border-slate-700")} border`}>
				{/* Header */}
				<div className={`flex justify-between items-center p-6 md:px-10 border-b shrink-0 ${c("border-slate-200", "border-slate-800")}`}>
					<div className="mr-8">
						<h3 className={`text-2xl md:text-3xl font-bold ${c("text-slate-900", "text-white")}`}>
							<TextAnimation text={project.title} />
						</h3>
						<p className={`text-sm md:text-base mt-2 font-bold ${c("text-blue-600", "text-blue-400")}`}>
							{project.year} • {project.category}
						</p>
					</div>
					<button 
						onClick={onClose}
						className={`p-2 rounded-full transition-colors shrink-0 ${c("hover:bg-slate-100 text-slate-500", "hover:bg-slate-800 text-slate-400")}`}
						aria-label="Close modal"
					>
						<X size={24} />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-hidden flex flex-col md:flex-row">
					{/* Left Column: Info */}
					<div className={`w-full md:w-1/3 flex flex-col overflow-y-auto p-6 md:p-10 border-r ${c("border-slate-200", "border-slate-800")}`}>
						{project.caseStudy ? (
							<div className="mb-8 space-y-6">
								<div>
									<h4 className={`flex items-center gap-2 text-sm uppercase tracking-wider font-bold mb-2 ${c("text-slate-900", "text-white")}`}>
										<span className="text-red-500">🎯</span> {t.projectModal?.challenge || "The Challenge"}
									</h4>
									<p className={`leading-relaxed text-sm ${c("text-slate-700", "text-slate-300")}`}>
										<TextAnimation text={project.caseStudy.problem} />
									</p>
								</div>
								<div>
									<h4 className={`flex items-center gap-2 text-sm uppercase tracking-wider font-bold mb-2 ${c("text-slate-900", "text-white")}`}>
										<span className="text-yellow-500">💡</span> {t.projectModal?.solution || "The Solution"}
									</h4>
									<p className={`leading-relaxed text-sm ${c("text-slate-700", "text-slate-300")}`}>
										<TextAnimation text={project.caseStudy.solution} />
									</p>
								</div>
								<div>
									<h4 className={`flex items-center gap-2 text-sm uppercase tracking-wider font-bold mb-2 ${c("text-slate-900", "text-white")}`}>
										<span className="text-blue-500">🚀</span> {t.projectModal?.impact || "The Impact"}
									</h4>
									<p className={`leading-relaxed text-sm ${c("text-slate-700", "text-slate-300")}`}>
										<TextAnimation text={project.caseStudy.impact} />
									</p>
								</div>
							</div>
						) : (
							<div className="mb-8">
								<h4 className={`text-sm uppercase tracking-wider font-bold mb-3 ${c("text-slate-500", "text-slate-400")}`}>Description</h4>
								<p className={`leading-relaxed text-base ${c("text-slate-700", "text-slate-300")}`}>
									<TextAnimation text={project.desc} />
								</p>
							</div>
						)}

						<div className="mb-8">
							<h4 className={`text-sm uppercase tracking-wider font-bold mb-3 ${c("text-slate-500", "text-slate-400")}`}>Technologies</h4>
							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag: string, tIdx: number) => (
									<span
										key={tIdx}
										className={`text-xs px-3 py-1.5 rounded-lg font-bold ${c("bg-slate-100 text-slate-600", "bg-slate-800 text-slate-300")}`}>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-3 mt-auto pt-6">
							<a 
								href={project.githubUrl} 
								target="_blank" 
								rel="noreferrer"
								className="flex items-center justify-center gap-3 w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:-translate-y-1"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
								{t.projectModal?.github || "Buka GitHub"}
							</a>
							{project.liveUrl && (
								<a 
									href={project.liveUrl} 
									target="_blank" 
									rel="noreferrer"
									className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:-translate-y-1"
								>
									<ExternalLink size={20} /> 
									{t.projectModal?.live || "Go to Website"}
								</a>
							)}
						</div>
					</div>

					{/* Right Column: Live Preview */}
					<div className={`w-full md:w-2/3 h-96 md:h-auto min-h-[400px] flex items-center justify-center relative ${c("bg-slate-50", "bg-slate-900/50")}`}>
						{project.previewImage ? (
							<div className="relative w-full h-full group overflow-hidden flex items-center justify-center p-4">
								<img 
									src={project.previewImage} 
									alt={`Preview of ${project.title}`}
									className="max-w-full max-h-full object-contain rounded-xl shadow-lg pointer-events-none"
								/>
								{/* Overlay untuk klik */}
								{project.liveUrl && (
									<a 
										href={project.liveUrl} 
										target="_blank" 
										rel="noreferrer"
										className="absolute inset-0 z-10 cursor-pointer"
										title="Buka Website di Tab Baru"
									>
										<span className="sr-only">Buka Website</span>
									</a>
								)}
								{/* Floating Button (Muncul saat hover) */}
								{project.liveUrl && (
									<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
										<div className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-bold border ${c("bg-slate-900 border-slate-700 text-white shadow-slate-900/20", "bg-white border-slate-200 text-slate-900 shadow-white/20")}`}>
											<ExternalLink size={18} /> Go to Website
										</div>
									</div>
								)}
							</div>
						) : project.liveUrl ? (
							<div className="relative w-full h-full group overflow-hidden">
								<div className="w-full h-full overflow-y-auto scrollbar-hide">
									<div className="w-full h-[1200px] relative">
										<iframe 
											src={project.liveUrl} 
											className="absolute inset-0 w-full h-full border-0 pointer-events-none"
											title={`Preview of ${project.title}`}
										></iframe>
										{/* Overlay transparan: memblokir klik di iframe dan mengubahnya jadi link ke tab baru */}
										<a 
											href={project.liveUrl} 
											target="_blank" 
											rel="noreferrer"
											className="absolute inset-0 z-10 cursor-pointer"
											title="Buka Website di Tab Baru"
										>
											<span className="sr-only">Buka Website</span>
										</a>
									</div>
								</div>
								
								{/* Floating Button (Muncul saat hover) */}
								<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
									<div className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-bold border ${c("bg-slate-900 border-slate-700 text-white shadow-slate-900/20", "bg-white border-slate-200 text-slate-900 shadow-white/20")}`}>
										<ExternalLink size={18} /> Go to Website
									</div>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center text-center p-8 opacity-60">
								<Globe size={64} className={`mb-6 ${c("text-slate-300", "text-slate-700")}`} />
								<p className={`text-xl font-bold ${c("text-slate-500", "text-slate-500")}`}>
									{t.projectModal?.noLive || "Mohon maaf, saat ini belum ada live previewnya"}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
